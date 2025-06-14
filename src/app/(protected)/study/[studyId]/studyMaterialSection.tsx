import React, { useEffect } from 'react'
import MaterialItemCard, { MaterialType } from './materialItemCard'
import axios from 'axios'
import { DrizzleStudyMaterial } from '@/lib/db/schema'
import { useLocalStorage } from 'usehooks-ts'


type studTypeContent = {
      notes:[],
      flashcards:[],
      quiz:[],
      qa:[]
}
type ItemProp = {
    name: string;
    desc: string;
    icon: string;
    link:string;
    type: MaterialType
}
const items  = [
    {
        name:"Notes",
        desc:"Go through the Study Notes and Chapters to understand the concepts.",
        icon:'/notes.png',
        link:'/notes',
        type:"notes"
    },
    {
        name:"FlashCards",
        desc:"Flashcards are a great way to memorize key concepts and definitions.",
        icon:'/flashcard.png',
        link:'/flashcards',
        type:"flashcards"
    },
    {
        name:"Quiz",
        desc:"Quizzes are a great way to test your knowledge and retention.",
        icon:'/quiz.png',
        link:'/quiz',
        type:"quiz"
    },
    {
        name:"Question/Answer",
        desc:"Practice answering questions to reinforce your understanding.",
        icon:'/qa.png',
        link:'/qa',
        type:"qa"
    },
] as ItemProp[]
const StudyMaterialSection = ({studyId, studyMaterial}: {studyId: string, studyMaterial: DrizzleStudyMaterial}) => {
    const [materials, setMaterials] = useLocalStorage<studTypeContent | undefined>('studyTypeContents',undefined);

    const getMaterials = async () => {
        const res = await axios.post( '/api/study-type', {
            studyId,
            studyType: "All"
        });
        setMaterials(res.data);
    }

    useEffect(() => {
        getMaterials();
    },[])
  return (
    <div className='mt-5'>
        <h2 className='font-bold text-sm md:text-lg'>Study Materials</h2>
        {materials &&

        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3'>
            {items.map((item, i) => (
            <MaterialItemCard key={i} item={item}
            studyTypeContent={materials} studyId={studyId}
            studyMaterial={studyMaterial}
            refreshData={getMaterials} />

        ))}</div>
        }
    </div>
  )
}

export default StudyMaterialSection;