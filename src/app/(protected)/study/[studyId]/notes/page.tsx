"use client"
import { Button } from '@/components/ui/button'
import { cleanNotesHTML } from '@/lib/utils'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import StepProgress from '../stepProgress'

type Note = {
    notes: string;
};

const Notes = () => {
    const {studyId} = useParams();
    const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
    const [stepCount, setStepCount] = useLocalStorage<number>('stepCount', 0);
    console.log('notes', notes.length);
    const router = useRouter();
    const getNotes = async () => {
        const res = await axios.post('/api/study-type', {
            studyId,
            studyType: "notes"
        });
        setNotes(res.data)
    }
    React.useEffect(() => {
        getNotes();
    }, []);
  return (
    <div className=''>
        {notes && (
            <StepProgress
                data={notes.map(item => item.notes)}
                stepCount={stepCount}
                setStepCount={setStepCount}
            />
        )}
        <div className='mt-5 w-full flex justify-center'>
            <div
                className='flex flex-col w-[90%] max-w-[90vw] sm:max-w-[100%] '
                dangerouslySetInnerHTML={{ __html: cleanNotesHTML(notes[stepCount]?.notes) }}
            />
        </div>
        {Array.isArray(notes) && notes.length > 0 && stepCount === notes.length - 1 &&
            <div className='flex flex-col justify-center items-center gap-2 mt-5'>
                <h2 className=''>End of Notes</h2>
                <Button
                    className='cursor-pointer'
                    onClick={() => router.back()}
                >
                    Go to Course Page
                </Button>
            </div>
        }
    </div>
  )
}

export default Notes