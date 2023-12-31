
// インターフェース
interface HeaderComponentProps {
    showTitle:boolean;
    showheaderText:boolean;
}

export default function Header (props:HeaderComponentProps) {

    const { showTitle, showheaderText } = props;

    return(
        <>
            <div className='header-container'>
                {showTitle ? 
                    (<h3 className="drwaingText headerText"><a href="/">enumura<span className="text-blue-950">3D</span></a></h3>) :
                        (<div>Loading...</div>)}
                    <div className='header-right-elem'>
                        {showheaderText ? (<div className="drwaingText headerText"><a href="https://qiita.com/enumura1">Qiita</a></div>) :
                        (<div>Loading...</div>)}
                        {showheaderText ? (<div className="drwaingText headerText"><a href="https://github.com/enumura1">GitHub</a></div>) :
                        (<div></div>)}
                    </div>
            </div>
        </>
    )
}