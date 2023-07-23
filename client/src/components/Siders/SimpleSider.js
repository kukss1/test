import './SimpleSider.css'

function SimpleSider({params}) {
    return (
        <div className="simpleSider_wrapper">
        <div className="simpleSider">
            <h1>{params}</h1>
        </div>
        </div>
    )
}

export default SimpleSider;