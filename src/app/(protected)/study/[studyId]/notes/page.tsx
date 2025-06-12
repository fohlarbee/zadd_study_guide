"use client"
import { Button } from '@/components/ui/button'
import { cleanNotesHTML } from '@/lib/utils'
import axios from 'axios'
import {  ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'

type Note = {
    notes: string;
    // add other properties if needed
};

const Notes = () => {
    const {studyId} = useParams();
    const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
    const [stepCount, setStepCount] = useLocalStorage<number>('stepCount', 5);
    const router = useRouter();
    const getNotes = async () => {
        const res = await axios.post('/api/study-type', {
            studyId,
            studyType: "Notes"
        });
        console.log(res.data);
        setNotes(res.data)
    }
    React.useEffect(() => {
        getNotes();
    }, []);
  return (
    <div className='w-[90%] bg-blue-400'>
        <div className='flex gap-2 items-center  justify-center bg-red-500'>
                
            {stepCount !== 0 &&

             <Button 
                onClick={() => setStepCount(stepCount - 1)}
            variant='outline' size='icon'>
                <ArrowLeftIcon/>
            </Button>
            }
            {notes?.map((n, i) => (

                    <div
                        key={i}
                        className={`
                            flex-1 min-w-[6px] w-full max-w-[110px] h-2 rounded-md justify-center mt-auto mb-auto
                            ${i < stepCount ? 'bg-primary' : 'bg-gray-200'}
                            mx-0.5
                        `}
                       
                    >
                    </div>
            ))}
            {stepCount !== notes.length &&
            
            <Button 
                onClick={() => setStepCount(stepCount + 1)}
            variant='outline' size='icon'>
                                <ArrowRightIcon/>
            </Button>
            }
            
            

        </div>
        <div className='mt-5 w-full flex justify-center'>
            <div
            className='flex flex-col w-[90%] max-w-[90vw] sm:max-w-[90%] overflow-x-hidden'
            dangerouslySetInnerHTML={{ __html: cleanNotesHTML(notes[stepCount]?.notes) }}
            />

            {stepCount === notes.length &&
            <div className='flex flex-col items-center justify-center gap-2 mt-5'>
                <h2>End of Notes</h2>
                <Button
                className='cursor-pointer'
                onClick={() => router.back()}
                >
                Go to Course Page
                </Button>
            </div>
            }
        </div>
    </div>
  )
}

export default Notes