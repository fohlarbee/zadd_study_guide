"use client"
import { Button } from '@/components/ui/button'
import { cleanNotesHTML } from '@/lib/utils'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import StepProgress from '../stepProgress'
import useStudyMaterial from '@/hooks/useStudyMaterial'

type Note = {
    notes: string;
    completed: boolean;
};

const Notes = () => {
    const {studyId} = useParams();
    const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
    const [stepCountNotes, setStepCountNotes] = React.useState<number>( 0);
    const {studyMaterial} = useStudyMaterial();
    const [isLoadingStateNotes, setIsLoadingStateNotes] = React.useState<boolean>(false);
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
                stepCount={stepCountNotes}
                setStepCount={setStepCountNotes}
            />
        )}
        <div className='mt-5 w-full flex justify-center items-center'>
            <div
                className='flex flex-col w-[90%] max-w-[90vw] sm:max-w-[90%] overflow-hidden '
                dangerouslySetInnerHTML={{ __html: cleanNotesHTML(notes[stepCountNotes]?.notes) }}
            />
        </div>
        {Array.isArray(notes) && notes.length > 0 && stepCountNotes === notes.length - 1 &&
            <div className='flex flex-col justify-center items-center gap-2 mt-5'>
                <h2 className=''>End of Notes</h2>
                <Button
                disabled={isLoadingStateNotes || notes[notes.length - 1].completed === true}
                    className={`cursor-pointer ${notes[notes.length - 1].completed === true ? 'bg-green-600 text-[#fff]' : ''}`}
                    onClick={!notes[notes.length - 1].completed === true ? async() => {
                        setIsLoadingStateNotes(true)
                          await axios.post('/api/progress', {
                            studyId,
                            progress: studyMaterial.progress! + 25,
                            type:'notes'
                          });
                         
                          setIsLoadingStateNotes(false)
                          router.back()
                    } : () => null}
                >
                    {notes[notes.length - 1].completed === true ? 'Done' : 'Mark as done'}
                </Button>
            </div>
        }
    </div>
  )
}

export default Notes