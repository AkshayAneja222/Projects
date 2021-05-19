import OutputScreenRow from "./OutputScreenRow"

const OutputScreen = (props)=>{
    return (
    <div className="outputScreen">
        <OutputScreenRow value={props.question}/>
        <OutputScreenRow value={props.answer}/>
    </div>
    )
};
export default OutputScreen;