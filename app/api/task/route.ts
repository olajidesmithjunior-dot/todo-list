import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const filePath = path.join(process.cwd(), "data", "tasks.json");

function readTasks() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) || [];
  } catch (err) {
    return [];
  }
}

function writeTasks(tasks: any) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// GET
export async function GET() {
  const tasks = readTasks();
  return NextResponse.json({ tasks });
}

// POST
export async function POST(request: Request) {
  const newTask = await request.json();
  const tasks = readTasks();
  const task = { id: uuidv4(), ...newTask };
  tasks.push(task);
  writeTasks(tasks);
  return NextResponse.json({ message: "Task created", data: task }, { status: 201 });
}

// PUT
export async function PUT(request: Request) {
  const updatedTask = await request.json();
  let tasks = readTasks();
  tasks = tasks.map((t: any) => (t.id === updatedTask.id ? updatedTask : t));
  writeTasks(tasks);
  return NextResponse.json({ message: "Task updated", data: updatedTask }, { status: 200 });
}

// DELETE
export async function DELETE(request: Request) {
  const { id } = await request.json();
  let tasks = readTasks();
  tasks = tasks.filter((t: any) => t.id !== id);
  writeTasks(tasks);
  return NextResponse.json({ message: "Task deleted", id }, { status: 200 });
}
