import React from "react";
import { Link } from 'react-router-dom'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import LogoBlanco from './../../home/images/LogoBlanco.PNG'


const FooterPagePro = () => {
  return (
    <div className="footer">
    <MDBFooter color="unique-color-dark" className="page-footer font-small pt-0 mt-5">
      <div style={{ backgroundColor: "#dee2e6" }}>
        <MDBContainer fluid className="text-center text-md-left">
          <MDBRow className="py-4 d-flex align-items-center">
            <MDBCol md="6" lg="5" className="text-center text-md-left mb-4 mb-md-0">
              <h6 className="mb-0" >
                CODE_CARRY
              </h6>
            </MDBCol>
            <MDBCol md="6" lg="7" className="text-center text-md-right">
              <Link>
              <i class="fab fa-mdb" />
              </Link>
              <Link>
                <i className="fa fa-twitter" aria-hidden="true"/>
              </Link>
              <Link>
              <i className="fa fa-linkedin" aria-hidden="true"/>
                </Link>
                <Link>
                <i className="fa fa-instagram" aria-hidden="true"/>
                </Link>
                <Link>
                <i class="fa fa-google" aria-hidden="true"></i>
                </Link>
               
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <MDBContainer className="mt-5 mb-4 text-center text-md-left text-white">
        <MDBRow className="mt-3">
          <MDBCol md="3" lg="3" xl="3" className="mb-4">
            <h6 className="text-uppercase font-weight-bold text-white">
              <strong>CODE_CARRY S.L.</strong>
            </h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px",backgroundColor:"white" }} />
            <p>
             La mejor web  española de ayuda en el mundo de las tecnologías y lenguajes de programación.
            </p>
          </MDBCol>
          <MDBCol md="2" lg="2" xl="2" className="mb-4">
            <h6 className="text-uppercase font-weight-bold text-white">
              <strong>Servicios</strong>
            </h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px",backgroundColor:"white" }} />
            <p>
              <Link to="/auth/login">Privacidad</Link>
            </p>
            <p>
            <Link to="/auth/login">Seguridad</Link>
            </p>
            <p>
            <Link to="/auth/login">Ayuda</Link>
            </p>
            <p>
            <Link to="/auth/login">Software</Link>
            </p>
          </MDBCol>
          <MDBCol md="2" lg="2" xl="2" className="mb-4">
            <h6 className="text-uppercase font-weight-bold text-white">
              <strong>Nosotros</strong>
            </h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" ,backgroundColor:"white"}} />
            <p>
            <Link to="/auth/login">Empresa</Link>
            </p>
            <p>
            <Link to="/auth/signup">Equipo</Link>
            </p>
            <p>
            <Link to="/auth/login">Desarrolladores</Link>
            </p>
            <p>
            <Link to="/auth/login">Instalaciones</Link>
            </p>
          </MDBCol>

          <MDBCol md="3" lg="3" xl="3" className="mb-4">
            <h6 className="text-uppercase font-weight-bold text-white">
              <strong>Contacto</strong>
            </h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" ,backgroundColor:"white"}} />
            <p>
              <i className="fa fa-home mr-3" /> Madrid, MD 28043, ES
            </p>
            <p>
              <i className="fa fa-envelope mr-3" /> info@code_carry.com
            </p>
            <p>
              <i className="fa fa-phone mr-3" /> + 01 234 567 88
            </p>
            <p>
              <i className="fa fa-print mr-3" /> + 01 234 567 89
            </p>
            </MDBCol>
            <MDBCol md="2" lg="2" xl="2" className="mt-5  ">
              <img src={LogoBlanco} className="logo-footer" />
            

          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="text-center py-3 text-white">
        <MDBContainer fluid>
         Design by Barros & Moreno 
        </MDBContainer>
      </div>
    </MDBFooter>
    </div>
  );
}
export default FooterPagePro;