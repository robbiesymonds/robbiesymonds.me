import { InvoiceTask } from "@interfaces/invoice"
import { IconButton, TextField } from "@ui/controls"
import { AddIcon, DeleteIcon } from "@ui/display/icons"
import { memo, useEffect, useState } from "react"
import { v4 } from "uuid"

interface InvoiceTasksProps {
  onChange?: (field: string, string: any) => void
}

const InvoiceTasks = ({ onChange }: InvoiceTasksProps) => {
  const [tasks, setTasks] = useState<Array<InvoiceTask>>([
    {
      _id: v4(),
      title: null,
      description: null,
      rate: null,
      hours: null,
    },
  ])

  function addTask() {
    setTasks([
      ...tasks,
      {
        _id: v4(),
        title: null,
        description: null,
        rate: null,
        hours: null,
      },
    ])
  }

  function removeTask(i: number) {
    const newTasks = tasks.filter((_, index) => index !== i)
    setTasks([...newTasks])
  }

  function updateTask(key: string, index: number, value: string | number) {
    const newTasks = tasks
    newTasks[index][key] = value
    setTasks([...newTasks])
  }

  useEffect(() => onChange("entries", tasks))

  return (
    <div style={{ marginBottom: "1rem" }}>
      <style jsx>{`
        .container {
          width: 100%;
          border-radius: 0.5rem;
          margin: 1rem 0;
          overflow: hidden;
          border: 1px solid var(--theme-colors-border);
        }

        .task {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;
          gap: 1rem;
          border-bottom: 1px solid var(--theme-colors-border);
          padding: 2rem 1rem;
          background-color: #111;
          box-sizing: border-box;
          position: relative;
        }

        .task:last-child {
          border: none;
        }

        .task > div {
          position: absolute;
          right: 0.5rem;
          top: 0.75rem;
          opacity: 0.35;
        }
      `}</style>
      <div className="container">
        {tasks.map(({ _id, title, description, rate, hours }, i) => (
          <div key={_id} className="task">
            {i > 0 && (
              <div>
                <IconButton onClick={() => removeTask(i)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
            <TextField
              defaultValue={title}
              name="title"
              type="text"
              placeholder="Title"
              maxWidth={35}
              onChange={(e) => updateTask("title", i, e.target.value)}
            />
            <TextField
              defaultValue={description}
              name="description"
              type="text"
              placeholder="Description"
              maxWidth={35}
              onChange={(e) => updateTask("description", i, e.target.value)}
            />
            <TextField
              defaultValue={rate}
              name="rate"
              type="number"
              placeholder="Rate"
              maxWidth={15}
              onChange={(e) => updateTask("rate", i, parseInt(e.target.value))}
            />
            <TextField
              defaultValue={hours}
              name="hours"
              type="number"
              placeholder="Hours"
              maxWidth={15}
              onChange={(e) => updateTask("hours", i, parseInt(e.target.value))}
            />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <IconButton outline onClick={() => addTask()}>
          <AddIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default memo(InvoiceTasks)
