import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div className="container-xxl position-relative bg-white d-flex p-0">
            <div className="container-fluid">
                <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                    <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                        <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <a href="#" className="">
                                    <h3 className="text-primary"><i className="fa fa-hashtag me-2" />DASHMIN</h3>
                                </a>
                                <h3>Sign Up</h3>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingText" placeholder="jhondoe" />
                                <label htmlFor="floatingText">Username</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <button className="btn btn-primary py-3 w-100 mb-4"><Link to='/dashboard' className='text-light'>Sign Up</Link></button>
                            <p className="text-center mb-0">Already have an Account? <Link to="/">Sign In</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup