"use client";
import React from 'react'
import SelectOption from './_components/SelectOption';
import {useLocalStorage} from 'usehooks-ts'
import { Button } from '@/components/ui/button';
import TopicInput from './_components/TopicInput';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import useRefresh from '@/hooks/useRefresh';

const Create = () => {
    const [step, setStep] = useLocalStorage<number>("step", 0);
    const [formData, setFormData] = useLocalStorage<Record<string, string>>('formData', {});
    const [loading, setLoading] = useLocalStorage<boolean>('loading',false);
    const router = useRouter();
    const refresh = useRefresh();

    const mutation = useMutation({
        mutationFn: async (data: Record<string, string>) => {
            setLoading(true);
            const res = await axios.post('/api/generate-study-outline', {
                ...data,
            });
            return res.data.res;
        },
        onSuccess: async () => {
            setLoading(false);
            setStep(0);
            setFormData({});
            toast.success("Study outline generated");
            await refresh();

        },
        onError: () => {
            setLoading(false);
            toast.error("Failed to generate study outline");
        }
    })

    const handleUserInput = (fieldName: string, fieldValue: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: fieldValue
        }));
    }
    const generateStudyOutline = async () => {
       await mutation.mutateAsync(formData);
       
        router.replace('/dashboard');
        
    };
  return (
    <div className='flex flex-col items-center justify-center gap-1 p-4 md:px-24 lg:px:36 mt-2 md:mt-10'>
        <h2 className='font-bold text-xl md:text-3xl text-primary'>
            Start building your study material
        </h2>
        <p className='text-sm text-muted-foreground'>Fill in the details to generate a study guide</p>
        <div className='flex flex-col items-center justify-center gap-1 md:px-24 lg:px-36 w-full max-w-4xl mx-auto mt-1 md:mt-3'>
            {step === 0 ? 
            (
                <>
                <SelectOption selectedStudyType={(value) => handleUserInput('studyType', value)} />
                </>
            )
            : 
            <>
                <TopicInput
                setTopic={(value) => handleUserInput('topic', value)}
                setDifficulty={(value) => handleUserInput('difficulty', value)}
                />
            </>
            
        } 
        </div>
        <div className='flex items-center justify-between w-full mt-4'>
           {step !== 0 ? <Button
           onClick={() => setStep(step - 1)} variant='outline'>Previous</Button> : " -"}
           {step === 0 ? (<Button
           onClick={() => setStep(step + 1)}>Next</Button>) : (<Button 
            disabled={loading}
           onClick={generateStudyOutline}>{loading ? <Loader2Icon className="animate-spin" /> : "Generate"}</Button>)} 
        </div>
    </div>
   
  )
}

export default Create