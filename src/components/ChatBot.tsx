import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowLeft,
  ExternalLink,
  Lock,
  Mic,
  Save,
  SendHorizontal,
  Settings,
  Image as ImageIcon,
  Music,
  Video,
  BarChart,
  MessageSquare,
  Globe,
} from 'lucide-react'

export default function ChatBot() {
  const [message, setMessage] = React.useState('')

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="flex items-center border-b border-gray-800 p-4">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center">
          <span className="mr-2 rounded-full bg-green-500 px-2 py-0.5 text-xs">Chat GPT 3.5</span>
        </div>
        <div className="ml-auto flex space-x-2">
          <Button variant="ghost" size="icon">
            <Lock className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <Card className="mx-auto max-w-2xl bg-gray-900/50 text-white">
          <CardContent className="p-6">
            <div className="mb-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-green-500/10 p-3">
                  <Settings className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <h1 className="mb-2 text-2xl font-bold">How can I help you today?</h1>
              <p className="text-sm text-gray-400">
                This bot will display a prompt seeking the best for your tasks, and then it will display a greeting message
                with the name entered by the user
              </p>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card className="bg-gray-800/50 p-4">
                <div className="mb-2 flex justify-center">
                  <Save className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="mb-1 text-center text-sm font-medium">Saved Prompt Templates</h3>
                <p className="text-center text-xs text-gray-400">Used to save the most popular and helpful prompts</p>
              </Card>

              <Card className="bg-gray-800/50 p-4">
                <div className="mb-2 flex justify-center">
                  <Settings className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="mb-1 text-center text-sm font-medium">Media Type Selection</h3>
                <p className="text-center text-xs text-gray-400">Used to select media type for better understanding</p>
              </Card>

              <Card className="bg-gray-800/50 p-4">
                <div className="mb-2 flex justify-center">
                  <Globe className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="mb-1 text-center text-sm font-medium">Multilingual Support</h3>
                <p className="text-center text-xs text-gray-400">Choose the language for better communication</p>
              </Card>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-gray-800/50">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Text
                </TabsTrigger>
                <TabsTrigger value="image" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Image
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Video
                </TabsTrigger>
                <TabsTrigger value="music" className="flex items-center gap-2">
                  <Music className="h-4 w-4" />
                  Music
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Footer Input */}
      <div className="border-t border-gray-800 p-4">
        <div className="mx-auto max-w-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              // Handle message submission here
              setMessage('')
            }}
            className="relative flex items-center"
          >
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your prompt here..."
              className="rounded-full bg-gray-800 pr-24 text-white placeholder:text-gray-400"
            />
            <div className="absolute right-2 flex space-x-2">
              <Button type="button" size="icon" variant="ghost" className="h-8 w-8">
                <Mic className="h-4 w-4" />
              </Button>
              <Button type="submit" size="icon" className="h-8 w-8 bg-green-500 hover:bg-green-600">
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </form>
          <p className="mt-2 text-center text-xs text-gray-500">
            ChatGPT can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  )
}