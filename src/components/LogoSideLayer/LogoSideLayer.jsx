import styles from './LogoSideLayer.module.css'

export default function LogoSideLayer() {

    return (
        <>
            <div className={`d-flex align-items-center justify-content-center col-12 col-md-5 bg-primary ${styles.background}`}>
                <div>
                    <img src='./brand/logo.svg' alt="logo" width={250} className='my-4'/>
                </div>
            </div>

        </>
    )
}