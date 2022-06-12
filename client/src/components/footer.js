import React from 'react';
import { Github } from 'react-bootstrap-icons';

export default function Footer() {

    return(

        <footer className='mt-auto bg-dark py-3'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-6'>
                        <span className='text-light'>All The Things &#169; 2022</span>
                    </div>                    
                    <div className='col-6 text-end'>
                        <a 
                            className='text-light'
                            href='https://github.com/StevanFreeborn/allthethings'
                            target='_blank'
                        >
                            <Github size={25}/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>

    )

}