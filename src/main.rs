use yew::prelude::*;

enum Msg {}
struct Model {}

impl Component for Model {
    type Message = Msg;
    type Properties = ();

    fn create(_ctx: &Context<Self>) -> Self {
        Self {}
    }

    fn view(&self, _ctx: &Context<Self>) -> Html {
        html! {
            <iframe src="https://my.spline.design/untitled-984ea61dfbc60ee23facc17d64796d5b/" frameborder="0" />
        }
    }
}

fn main() {
    yew::start_app::<Model>();
}
