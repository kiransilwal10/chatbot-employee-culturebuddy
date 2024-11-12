/**
 * v0 by Vercel.
 * @see https://v0.dev/t/RfmomrssRDL
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SVGProps } from "react"
import { JSX } from "react/jsx-runtime"

export default function ToDo() {
    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">To-Do List</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Checkbox id="todo1" className="peer-absolute left-0 translate-x-2.5"/>
                    <label htmlFor="todo1" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Solve merge conflict in #280
                    </label>
                    <Button size="icon" variant="outline" className="ml-auto h-8 w-8">
                        <TrashIcon className="h-4 w-4"/>
                        <span className="sr-only">Delete task</span>
                    </Button>
                </div>
                <div className="flex items-center gap-4">
                    <Checkbox id="todo2" className="peer-absolute left-0 translate-x-2.5"/>
                    <label htmlFor="todo2" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Text James about the meeting
                    </label>
                    <Button size="icon" variant="outline" className="ml-auto h-8 w-8">
                        <TrashIcon className="h-4 w-4"/>
                        <span className="sr-only">Delete task</span>
                    </Button>
                </div>
                <div className="flex items-center gap-4">
                    <Checkbox id="todo3" className="peer-absolute left-0 translate-x-2.5"/>
                    <label htmlFor="todo3" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Update the README
                    </label>
                    <Button size="icon" variant="outline" className="ml-auto h-8 w-8">
                        <TrashIcon className="h-4 w-4"/>
                        <span className="sr-only">Delete task</span>
                    </Button>
                </div>
                <div className="flex items-center gap-4">
                    <Checkbox id="todo4" className="peer-absolute left-0 translate-x-2.5"/>
                    <label htmlFor="todo4" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Complete the assignment
                    </label>
                    <Button size="icon" variant="outline" className="ml-auto h-8 w-8">
                        <TrashIcon className="h-4 w-4"/>
                        <span className="sr-only">Delete task</span>
                    </Button>
                </div>
            </CardContent>
            <CardFooter>
                <form className="flex w-full">
                    <Input
                        type="text"
                        placeholder="Add a new task"
                        className="rounded-none border-0 border-gray-200 dark:border-gray-800 shadow-none flex-1"
                    />
                    <Button type="submit">Add</Button>
                </form>
            </CardFooter>
        </Card>
    )
}

function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    )
}