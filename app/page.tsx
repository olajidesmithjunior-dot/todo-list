"use client";

import Image from "next/image";
import { Check, PackageCheck, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // <-- import UUID
import { AnimatePresence, motion } from "framer-motion";


type Task = { id: string; title: string; status: string }; // <-- id en string pour UUID

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputTask, setInputTask] = useState("");
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Récupération des tâches
  useEffect(() => {
    fetch("/api/task")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Ajouter une tâche
  const addTask = async () => {
    if (!inputTask) return;

    const newTask = { id: uuidv4(), title: inputTask, status: "Pending" }; // <-- id unique côté client

    // POST vers l'API
    const res = await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const data = await res.json();

    // Mise à jour locale
    setTasks((prev) => [...prev, data.data || newTask]);
    setInputTask("");
  };

  // Modifier une tâche
  const updateTask = async (task: Task) => {
    const updated = {
      ...task,
      status: task.status === "Pending" ? "Completed" : "Pending",
    };

    const res = await fetch("/api/task", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    const data = await res.json();

    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? data.data || updated : t))
    );
    inputRef.current?.focus();
  };

  // Supprimer une tâche
  const handleDelete = async (id: string) => {
    await fetch("/api/task", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // filtre des tâches

  const [filter, setFilter] = useState<"All" | "Pending" | "Completed">("All");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.status === "Completed";
    if (filter === "Pending") return task.status === "Pending";
    return true;
  });
  console.log("Filtered Task :", filteredTasks);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-b from-black to-gray-800">
      <div className="flex w-full mx-auto flex-col items-center justify-center">
        <div>
          <PackageCheck size={100} className="text-accent mb-4" />
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-bold text-accent font-righteous uppercase">
            To-Do List
          </h1>
          <p className="mt-4 text-lg text-white">
            Manage your tasks efficiently and stay organized with our simple and
            intuitive to-do list application.
          </p>
        </div>

        <div className="md:flex flex-col rounded-2xl bg-transparent md:bg-gray-900/50 md:shadow-lg p-8 mt-8 w-full max-w-xl min-h-screen justify-between items-center">
          <div className="flex-col md:flex-row badge badge-soft mb-20 md:mb-10 md:bg-gray-900/70 flex items-center justify-center gap-10 py-5 px-10 border-0">
            <div className="flex gap-2 text-white text-center items-center">
              <p className="font-light text-sm">All</p>
              <input
                type="radio"
                name="filter"
                id="all"
                className="radio radio-accent w-4 h-4"
                checked={filter === "All"}
                onChange={() => setFilter("All")}
              />
            </div>
            <div className="flex gap-2 text-white text-center items-center">
              <p className="font-light text-sm text-warning">Pending</p>
              <input
                type="radio"
                name="filter"
                id="pending"
                className="radio radio-warning w-4 h-4"
                checked={filter === "Pending"}
                onChange={() => setFilter("Pending")}
              />
            </div>

            <div className="flex gap-2 text-center items-center">
              <p className="font-light text-sm text-success">Completed</p>
              <input
                type="radio"
                name="filter"
                id="completed"
                className="radio radio-success w-4 h-4"
                checked={filter === "Completed"}
                onChange={() => setFilter("Completed")}
              />
            </div>
          </div>

          {/* Filtre des tâches*/}
          <AnimatePresence>
            {loading ? (
              <p className="text-gray-400">
                <span className="loading loading-spinner loading-xl"></span>
              </p>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center md:min-h-[300px]"
              >
                {filteredTasks.map((e) => (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 200 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    key={e.id}
                    className="flex flex-col md:flex-row md:w-full gap-4 justify-between items-center w-[300px] shadow-2xl bg-gray-900/70 p-4 rounded-2xl mb-4"
                  >
                    <div className="flex items-center">
                      <p
                        className={`font-semibold text-sm text-center md:text-start ${
                          e.status === "Completed" ? "Pending" : "All"
                        }`}
                      >
                        {e.title}
                      </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-2 items-center">
                      <div>
                        <span
                          className={`badge badge-soft font-light text-sm py-2 ${
                            e.status === "Pending"
                              ? "badge-warning"
                              : "badge-success"
                          }`}
                        >
                          {e.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Check
                          onClick={() => updateTask(e)}
                          size={16}
                          strokeWidth={2}
                          className="text-green-600 hover:text-white cursor-pointer duration-300"
                        />
                        <X
                          onClick={() => handleDelete(e.id)}
                          size={16}
                          strokeWidth={4}
                          className="text-red-600 hover:text-white cursor-pointer duration-300"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          {/* Champ pour ajouter une tâche */}
          <div className="flex md:flex-row justify-center items-center sm:w-[200px] md:w-full gap-2 mt-4 mb-10">
            <input
              value={inputTask}
              onChange={(e) => setInputTask(e.target.value)}
              type="text"
              className="input input-accent input-ls text-sm w-[300px] sm:w-full rounded-full"
              placeholder="Add a new task..."
              ref={inputRef}
            />
            <button
              onClick={addTask}
              className="btn btn-accent btn-lg rounded-full"
              disabled={!inputTask.trim()}
            >
              <Plus size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
