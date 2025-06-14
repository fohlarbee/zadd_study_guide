import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react'
type QuizCardItemProps = {
    quiz: {
        question: string;
        options: string[];
        answer: string;
    };
    handleClick: (option: string, quiz: QuizCardItemProps['quiz']) => void;
}
const QuizCardItem = ({ quiz, handleClick }: QuizCardItemProps) => {
    const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  return (
    <div className='mt-10 p-5'>
        <h2 
        className='font-medium text-lg md:text-2xl text-center'>{quiz?.question}</h2>

        <div className='grid grid-cols-2 gap-2 md:gap-5 mt-5'>
            {quiz?.options.map((o,i ) => (
                <Button 
                onClick={() =>{ setSelectedOption(o);
                    handleClick(o, quiz);
                }} key={i} variant='outline' size='sm' className={cn(`w-full h-[50px] max-h-[100px] shadow-md 
                hover:bg-sidebar transform hover:scale-105 transition-transform duration-200 ease-in-out`,
                selectedOption === o ? 'bg-primary text-[#fff] hover:bg-primary hover:text-[#fff]' : 'text-muted-foreground')}>
                    <span
                        className={cn('text-center text-[10px] md:text-sm block'
                        )}
                        style={{
                            width: '100%',
                            maxWidth: '100%',
                            maxHeight: '100%',
                            overflow: 'hidden',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            display: 'block',
                        }}
                    >
                        {o}
                    </span>
                </Button>
            ))}
        </div>

    </div>
  )
}

export default QuizCardItem