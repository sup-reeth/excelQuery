import React from "react";

const footer = () => {
return (
    <div className="footerDiv bgblack colorwhite">
        <div className="row m-0 p-5">
            <div className="col-12 col-md-4 text-center">
                <h5>© 2025 Company</h5>
            </div>
            <div className="col-12 col-md-4 text-center">
                <h5>Quick Links</h5>
                <div>
                Registration
                </div>
                <div>

                Download certificate
                </div>
                <div>

                Vaccine center
                </div>
                <div>

                Schedule Appointment
                </div>
                <div>

                FAQ
                </div>
                <div>

                Contact Us
                </div>
            </div>
            <div className="col-12 col-md-4">
            <center>
            <h5>Feedback</h5>
            </center>
            <form>
  <div class="form-group">
    <label for="exampleFormControlInput1">Email address</label>
    <input type="email" class="form-control inputColor" id="exampleFormControlInput1" placeholder="name@example.com" />
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Feedback</label>
    <textarea class="form-control inputColor" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
  <button style={{width: "100%"}} type="button" class="btn btn-dark mt-3">Submit</button>
</form>
                </div>
        </div>
        
    </div>
)
}
export default footer;