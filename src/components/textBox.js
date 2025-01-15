export default function TextBox({name, placeholder, id, func=()=>{}}){
    return(
        <input onChange={func} id={id} name={name} placeholder={placeholder} className="bg-[#F3F1FF] text-black focus:scale-[1.02] ease-out duration-150" type="text"/>
    )
}