"use client";
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import StepProgress from '../stepProgress';
import QuizCardItem from './quizCardItem';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import useStudyMaterial from '@/hooks/useStudyMaterial';

type QuizItem = {
    question: string;
    options: string[];
    answer: string;
};
type QuizData = {
    content: QuizItem[];
    completed: boolean;
};


const QuizPage = () => {
    const {studyId} = useParams();
    const [quizData, setQuizData] = React.useState<QuizData | undefined>(undefined);
    const [stepCountQuiz, setStepCountQuiz] = React.useState<number>(0);
    const [correctAnswer, setCorrectAnswer] = React.useState<string | null>(null);
    const [isCorrectAnswer, setIsCorrectAnswer] = React.useState<boolean | null>(null);
    const [shouldShowCard, setShouldShowCard] = React.useState(false);
    const [isLoadingStateQuiz, setIsLoadingStateQuiz] = React.useState<boolean>(false);
    const {studyMaterial} = useStudyMaterial();
    const router = useRouter();
    
    // console.log('QuizData, quizData', quizData);

    React.useEffect(() => {
        if (isCorrectAnswer !== null) {
            setShouldShowCard(false); // Start hidden for transition
            const timer = setTimeout(() => {
                setShouldShowCard(true); // Show after 1 second
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setShouldShowCard(false); // Reset on close
        }
    }, [isCorrectAnswer]);

    const getQuiz = async () => {
        const res = await axios.post('/api/study-type', {
                    studyId,
                    studyType: "quiz"
                });
            // console.log('Quiz Data:', res.data);
            setQuizData(res.data);
        };

    React.useEffect(() => {
        (async () => {
            await getQuiz();    
        })();
    }, [studyId]);

    const checkAnswer = (option: string, currentQuestion: QuizItem) => {

      
        if (option === currentQuestion.answer) {
            return setIsCorrectAnswer(true);

        }

        setCorrectAnswer(currentQuestion.answer);
        setShouldShowCard(false);

        return setIsCorrectAnswer(false);
    }
    React.useEffect(() => {
        setCorrectAnswer(null);
        setIsCorrectAnswer(null);
    },[stepCountQuiz]);

  return (
    <div>
        <h2 className=' text-lg md:text-2xl font-bold mb-5 text-center'>Quiz</h2>
        {quizData && (
          <StepProgress
            data={quizData?.content.map(item => item.question)}
            stepCount={stepCountQuiz}
            setStepCount={setStepCountQuiz}
          />
        )}
        <div>

      
        {quizData?.content && quizData?.content[stepCountQuiz] && (
          <QuizCardItem quiz={quizData?.content[stepCountQuiz]} 
          handleClick={(o) => checkAnswer(o, quizData?.content[stepCountQuiz])}/>
        )}
        </div>
        {isCorrectAnswer  && (
            <div className={cn(`mt-5 text-green-500 text-center
            border border-green-500 p-5 rounded-md bg-green-500 shadow-md
            transition-all duration-700 ease-out transform`,
             shouldShowCard
                  ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                  : "opacity-0 translate-y-4 scale-95 pointer-events-none"
            )}>
                <h2 className='text-lg md:text-2xl font-light text-[#fff] '>
                 Correct Answer!
                </h2>
            </div>
        )}
      
        {isCorrectAnswer === false && (
             <div className={cn(`mt-5 text-red-500 text-center
            border border-red-700 p-5 rounded-lg bg-red-200 shadow-md
            transition-all duration-700 ease-out transform`,
          
            
            )}>
                <h2 className='text-sm md:text-l font-light text-red-600 '>
                 Incorrect <br />
                 The correct answer is: <span className='text-[#000]'>{correctAnswer}</span>
                </h2>
            </div>
        )}
        {Array.isArray(quizData?.content) && quizData?.content.length > 0 && stepCountQuiz === quizData?.content.length - 1 &&
                  <div className='flex flex-col justify-center items-center gap-2 mt-5'>
                      <h2 className=''>End of Quiz</h2>
                      <Button
                         disabled={isLoadingStateQuiz || quizData?.completed}
                    className={`cursor-pointer ${quizData?.completed ? 'bg-green-600 text-[#fff]' : ''}`}
                    onClick={!quizData?.completed ? async() => {
                        setIsLoadingStateQuiz(true)
                          await axios.post('/api/progress', {
                            studyId,
                            progress: studyMaterial.progress! + 25,
                            type: 'quiz'
                          });
                          setIsLoadingStateQuiz(false)
                          router.back()
                    } : () => null}
                >
                    {quizData?.completed ? 'Done' : 'Mark as done'}
                      </Button>
                  </div>
              }
    </div>
  )
}

export default QuizPage