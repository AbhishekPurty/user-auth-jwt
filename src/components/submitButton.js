export default function SubmitButton({text, func = ()=>{}}){
    return(
        <button onClick={func} className="text-white active:scale-[0.98] hover:scale-[1.02] ease-out duration-150">{text}</button>
    )
}