'use client'
import gsap from "gsap";
import { ReactLenis } from "lenis/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import AnimatedText from "./component/AnimatedText";

export default function Home() {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      if (!lenisRef.current) {
        return
      }
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    return () => gsap.ticker.remove(update);

  }, [])



  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <div className="p-10">

        <section className="hero relative w-full h-screen rounded-3xl overflow-hidden">
          <Image
            src="/bg-2.jpg"
            alt="background-2"
            fill
            className="object-cover"
            priority
          />
        </section>

        <section className="about space-y-3 p-10 text-center items-center">
          <div>
            <h1 className="text-7xl">A new chapter in <br /> engineered systems</h1>
          </div>
            <AnimatedText>
            <p className="text-xl">
              In the era defined by precision and speed, innovation <br /> reshapes the foundation of modern industry.
              Every <br /> component is built with intent, every system is designed <br />to perform at scale.
              This is more than machinery it is <br /> the architecture of progress, setting new benchmarks <br /> for how we build, move and connect
            </p>
            </AnimatedText>
        </section>

        <section className="hero relative  w-full h-screen rounded-3xl overflow-hidden">
          <Image
            src="/bg-3.jpg"
            alt="background-2"
            fill
            className="object-cover"
          />
        </section>

        <section className="services p-10 text-center space-y-3">
          <div className="service">
            <div>
              <h3 className="text-6xl">Precision Engineering</h3>
            </div>
            <AnimatedText>
            <p className="text-xl">
              Every breakthrough begins with detail. From the first sketch to <br /> full-scale production, our engineering process is built on
              accuracy, consistency, and <br /> performance. What you see isn't just a machine it's the sum of thousands of <br /> deliberate calculations desgined to set new standards in motion.
            </p>
            </AnimatedText>
          </div>
        </section>
        <section className="flex items-center justify-between p-10 h-screen">
          <AnimatedText>
          <p className="text-lg">
            Every breakthrough begins with detail. From the first sketch to <br /> full-scale production, our engineering process is built on
            accuracy, consistency, and performance. What you see isn't just a machine it's the sum of thousands of <br /> deliberate calculations desgined to set new standards in motion.
          </p>
          </AnimatedText>
          <Image src="/bird.jpg" className="rounded-3xl" alt="bird_image" height={600} width={600} />
        </section>
        <section className="flex space-x-3 items-center justify-between p-10">
          <Image src="/bird.jpg" alt="bird_image" className="rounded-3xl" height={600} width={600} />
          <AnimatedText>
          <p className="text-lg">
            Every breakthrough begins with detail. From the first sketch to <br /> full-scale production, our engineering process is built on
            accuracy, consistency, and <br /> performance. What you see isn't just a machine it's the sum of thousands of <br /> deliberate calculations desgined to set new standards in motion.
          </p>
          </AnimatedText>
        </section>
        <section className="flex items-center justify-between p-10 h-screen">
          <AnimatedText>
          <p className="text-lg">
            Every breakthrough begins with detail. From the first sketch to <br /> full-scale production, our engineering process is built on
            accuracy, consistency, and <br /> performance. What you see isn't just a machine it's the sum of thousands of <br /> deliberate calculations desgined to set new standards in motion.
          </p>
          </AnimatedText>
          <Image src="/bird.jpg" alt="bird_image" className="rounded-3xl" height={600} width={600} />
        </section>
        <section className="text-8xl min-h-screen flex items-center justify-center ">
          <h1 >
            Ending
          </h1>
        </section>
      </div>
    </>
  );
}
