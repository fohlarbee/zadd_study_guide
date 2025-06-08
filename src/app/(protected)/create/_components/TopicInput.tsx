import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

type TopicInputProps = {
    setTopic: (topic: string) => void;
    setDifficulty: (difficulty: string) => void;
}
const TopicInput = ({ setTopic, setDifficulty }: TopicInputProps) => {
    return (
        <div className="mt-6 flex flex-col w-full" style={{ width: '100%' }}>
            <h2 className="text-left mb-1 text-xs text-muted-foreground">
                Enter topic or paste content to generate guide
            </h2>
            <Textarea
                placeholder="Start writing here"
                className="mt-2 w-full"
                onChange={(e) => setTopic(e.target.value)}
            />
            <h2 className="text-left mb-1 text-xs text-muted-foreground mt-5">
                Select difficulty level
            </h2>
            <Select onValueChange={(value) => setDifficulty(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select difficulty level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export default TopicInput