"use client"
import React,{ ReactNode, useRef} from 'react'
import gsap from 'gsap'
import { ScrollTrigger} from 'gsap/ScrollTrigger'
import { SplitText } from "gsap/SplitText"
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger,SplitText)

export default function AnimatedText ({children,colorInitial="#dddddd",colorAccent="#FF8400",colorFinal="#000000"}:{children:ReactNode,colorInitial?:string,colorAccent?:string,colorFinal?:string}) {
    
    const containerRef = useRef<HTMLDivElement|null>(null)
   const splitRefs = useRef<{ wordSplit: SplitText; charSplit: SplitText }[]>([])
    const lastScrollProgress = useRef(0)
    const colorTransitionTimers = useRef(new Map())
    const completeChars = useRef(new Set())


    useGSAP(()=>{
        if(!containerRef.current) return;

        splitRefs.current=[];
        lastScrollProgress.current=0;
        colorTransitionTimers.current.clear()
        completeChars.current.clear()

        let elements = [];
        if(containerRef?.current.hasAttribute("data-copy-wrapper")){
            elements= Array.from(containerRef.current.children)
        }else{
            elements =[containerRef.current]
        } 

        elements.forEach((element)=>{
            const wordSplit = SplitText.create(element,{
                type:"words",
                wordsClass:"word"
            });
            const charSplit= SplitText.create(wordSplit.words,{
                type:"chars",
                charsClass:"char"
            });
            splitRefs.current.push({wordSplit,charSplit})
        })

        const allChars = splitRefs.current.flatMap(
            ({charSplit})=>charSplit.chars
        )
        gsap.set(allChars,{color:colorInitial})

        const scheduleFinalTransition = (char,index)=>{
            if(colorTransitionTimers.current.has(index)){
                clearTimeout(colorTransitionTimers.current.get(index))
            }
        const timer =setTimeout(()=>{
            if(!completeChars.current.has(index)){
                gsap.to(char,{
                    duration:0.1,
                    ease:"none",
                    color:colorFinal,
                    onComplete:()=>{
                        completeChars.current.add(index);
                    }
                });
            }
            colorTransitionTimers.current.delete(index);
        },100)
        colorTransitionTimers.current.set(index,timer)
        }

        ScrollTrigger.create({
            trigger:containerRef.current,
            start:"top 90%",
            end:"top 10%",
            scrub:1,
            onUpdate:(self)=>{
                const progress = self.progress
                const totalChars = allChars.length
                const isScrollingDown = progress >= lastScrollProgress.current
                const currentCharIndex = Math.floor(progress*totalChars)
                allChars.forEach((char,index)=>{
                    if(!isScrollingDown && index >= currentCharIndex){
                        if(colorTransitionTimers.current.has(index)){
                            clearTimeout(colorTransitionTimers.current.get(index));
                            colorTransitionTimers.current.delete(index)
                        }
                        completeChars.current.delete(index);
                        gsap.set(char, {color:colorInitial});
                        return;
                    }
                    if(completeChars.current.has(index)){
                        return;
                    }

                    if(index<=currentCharIndex){
                        gsap.set(char,{color:colorAccent});
                        if(!colorTransitionTimers.current.has(index)){
                            scheduleFinalTransition(char,index)
                        }
                        else{
                            gsap.set(char, {color:colorInitial})
                        }
                    }
                });
                lastScrollProgress.current=progress
            },

        })
    },{
        scope:containerRef,
        dependencies:[colorFinal,colorAccent,colorInitial],
    })

    if(React.Children.count(children)===1
        &&
    React.isValidElement(children)){
        return React.cloneElement(children as React.ReactElement<any>,{
            
        ref:containerRef as any})
    }
  return (
    <div ref={containerRef} data-copy-wrapper="true">{children}</div>
  )
}
