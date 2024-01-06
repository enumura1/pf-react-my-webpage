import LinearProgress from '@mui/joy/LinearProgress';

function LoadingScreen() {
    return (
      <div className='LoadMain'>
        <div className='progressBarContainer'>
          <h2>Now Loading・・・</h2>
          <LinearProgress size="lg"/>
        </div>
      </div>
    )
}

export default LoadingScreen;