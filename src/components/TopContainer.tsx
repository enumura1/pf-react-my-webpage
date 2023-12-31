
// インターフェース
interface topContainerProps {
    showTopContainerText: boolean
}


export default function TopContainer (props:topContainerProps){

    const {showTopContainerText } = props;
    
    return(
        <>
            <div className='top-container'>
                <div className='top-ctr-elem-left'>
                    {showTopContainerText ? (
                        <div className='topContainerText'>
                            <h1>こんにちは</h1>
                            <h1><span>enumura</span>です</h1>
                            <p>This is enumura’s portfolio.</p>
                            </div>) :
                            (<div>Loading...</div>)}
                        </div>
                <div className='top-ctr-elem-right'></div>
            </div>
        </>
    )
}