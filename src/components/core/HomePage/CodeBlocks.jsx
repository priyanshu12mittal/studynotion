import React from 'react'
import CTAButton from './CTAButton'
import HighlightText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa'
import {TypeAnimation} from 'react-type-animation'


const CodeBlocks = ({position, heading, subHeading, ctabtn1, ctabtn2, codeblock,bg}) => {

  return (
    <div className={`flex ${position} justify-around w-fit items-center py-14`}>
        {/* section1 */}
        <div className=' w-[40%] flex justify-center'>
            <div className=' flex max-w-[900px] flex-col gap-3'>
                {heading}
                <div className=' text-richblack-300 font-medium self-stretch font-inter text-base'>
                    {subHeading}
                </div>
                <div className=' flex gap-6 pt-14'>
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className=' flex gap-2 items-center'>
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>
            </div>
        </div>

        {/* section 2 */}
        <div className=' relative flex justify-center gap-1 border border-black p-2 py-8 min-w-[450px] max-w-[720px]'
        style={{
            background:" linear-gradient(141deg, rgba(14, 26, 45, 0.24) 0%, rgba(17,30,50,0.38) 100%)",
            backdropFilter:"blur(26px)"
        }}>
            <div className=' text-center flex flex-col items-center gap-[0.275rem] py-1 font-mono font-bold w-[10%] text-richblack-400' style={{
                fontSize:"1.1rem",
                lineHeight:"1.35rem"
            }}>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`w-[90%] flex flex-col font-mono pt-[0.2rem] leading-[0.85rem] text-[#ffd60a]`} style={{ fontSize: "1rem" }}>
                <TypeAnimation sequence={[codeblock,2000,""]} repeat={Infinity} omitDeletionAnimation={true} style={{
                    whiteSpace:"pre-line",
                    display:"block"
                }}/>
            </div>
            <div
                className="absolute -left-1 top-[-1rem] h-[19rem] w-[25rem] rounded-[23rem] opacity-20 blur-[34px]"
                style={{ background: `${bg}` }}
            ></div>
        </div>
    </div>
  )
}

export default CodeBlocks