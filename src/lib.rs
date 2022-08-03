use std::f64;
use std::fmt::Write;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::CanvasGradient;
use web_sys::CanvasRenderingContext2d;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    #[wasm_bindgen(js_namespace = Math)]
    fn random() -> f64;
}

#[wasm_bindgen(module = "/public/noise.js")]
extern "C" {
    fn noise2D(x: f64, y: f64) -> f64;
}

#[derive(Clone)]
pub struct Vertex {
    x: f64,
    y: f64,
    origin_x: f64,
    origin_y: f64,
    noise_offset_x: f64,
    noise_offset_y: f64,
}

pub type Coord = (f64, f64);
static mut POINTS: Vec<Vertex> = Vec::new();
static mut HUE_OFFSET: f64 = 0.0;
static NOISE_STEP: f64 = 0.003;

fn norm(a: f64, b: f64) -> f64 {
    normalise(b, -1.0, 1.0, a - 10.0, a + 10.0)
}

fn normalise(n: f64, a: f64, b: f64, c: f64, d: f64) -> f64 {
    ((n - a) / (b - a)) * (d - c) + c
}

fn noise(n: f64) -> f64 {
    noise2D(n, n)
}

// Converts points into Cartesian coordinates.
pub fn format_points(points: Vec<Vertex>) -> Vec<Coord> {
    let mut coords: Vec<Coord> = points.iter().map(|p: &Vertex| (p.x, p.y)).collect();
    let shifts: [(f64, f64); 4] = [
        coords[coords.len() - 1],
        coords[coords.len() - 2],
        coords[0],
        coords[1],
    ];

    coords.insert(0, shifts[0]);
    coords.insert(0, shifts[1]);
    coords.push(shifts[2]);
    coords.push(shifts[3]);
    return coords;
}

// Generates a valid Path2D string.
pub fn spline(points: &Vec<Vertex>, tension: f64) -> String {
    let coords: Vec<(f64, f64)> = format_points(points.to_vec());
    let mut path: String = format!("M{},{}", coords[1].0, coords[1].1);

    for i in 1..coords.len() - 2 {
        let x0 = coords[i - 1].0;
        let y0 = coords[i - 1].1;
        let x1 = coords[i].0;
        let y1 = coords[i].1;
        let x2 = coords[i + 1].0;
        let y2 = coords[i + 1].1;

        let mut x3 = x2;
        let mut y3 = y2;
        if i != coords.len() - 2 {
            x3 = coords[i + 2].0;
            y3 = coords[i + 2].1;
        }

        let cp1x = x1 + ((x2 - x0) / 6.0) * tension;
        let cp1y = y1 + ((y2 - y0) / 6.0) * tension;
        let cp2x = x2 - ((x3 - x1) / 6.0) * tension;
        let cp2y = y2 - ((y3 - y1) / 6.0) * tension;
        write!(path, "C{},{},{},{},{},{}", cp1x, cp1y, cp2x, cp2y, x2, y2).unwrap();
    }

    return path;
}

#[wasm_bindgen(js_name = createPoints)]
pub fn create_points(n: u8, r: f64, w: f64, h: f64) {
    unsafe {
        POINTS.clear();
    }
    for i in 1..(n + 1) {
        let theta: f64 = (i as f64 * (f64::consts::PI * 2.0)) / n as f64;
        let x = (w / 2.0) + theta.cos() * r;
        let y = (h / 2.0) + theta.sin() * r;
        unsafe {
            POINTS.push(Vertex {
                x,
                y,
                origin_x: x,
                origin_y: y,
                noise_offset_x: random() * 1000.0,
                noise_offset_y: random() * 1000.0,
            })
        }
    }
}

#[wasm_bindgen]
pub fn redraw(canvas: &web_sys::HtmlCanvasElement) {
    let ctx: CanvasRenderingContext2d = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .unwrap();

    unsafe {
        // Generate the new path and update the points.
        let spline: String = spline(&POINTS, 1.0);
        let path: web_sys::Path2d = web_sys::Path2d::new_with_path_string(&spline).unwrap();
        let hue: f64 = normalise(noise(HUE_OFFSET), -1.0, 1.0, 0.0, 360.0);

        for i in 0..POINTS.len() {
            let noise_x = noise(POINTS[i].noise_offset_x);
            let noise_y = noise(POINTS[i].noise_offset_y);

            POINTS[i].x = norm(POINTS[i].origin_x, noise_x);
            POINTS[i].y = norm(POINTS[i].origin_y, noise_y);
            POINTS[i].noise_offset_x += NOISE_STEP;
            POINTS[i].noise_offset_y += NOISE_STEP;
        }

        // Draw/update elements on the 2D canvas.
        let gradient: CanvasGradient =
            web_sys::CanvasRenderingContext2d::create_linear_gradient(&ctx, 0.0, 0.0, 100.0, 100.0);

        gradient
            .add_color_stop(0.0, format!("hsl({}, 100%, 75%)", hue).as_str())
            .unwrap();

        gradient
            .add_color_stop(1.0, format!("hsl({}, 100%, 75%)", hue + 60.0).as_str())
            .unwrap();

        ctx.set_fill_style(&format!("hsl({}, 75%, 5%)", hue + 60.0).as_str().into());
        ctx.fill_rect(0.0, 0.0, canvas.width().into(), canvas.height().into());
        ctx.set_fill_style(&gradient);
        ctx.fill_with_path_2d(&path);

        HUE_OFFSET += NOISE_STEP / 6.0;
    }
}
