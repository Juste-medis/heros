import React from 'react';
import { Link } from 'react-router-dom';
 
const ErrorPage = () => {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="text-center">
                <h1 className="display-1 fw-bold text-danger">404</h1>
                <p className="fs-3 text-secondary">Oups! Page non trouvée.</p>
                <p className="lead text-muted">
                    Il semble que la page que vous recherchez n'existe pas.
                </p>
                <Link to="/" className="btn btn-primary btn-lg mt-3">
                    Retour à la page d'accueil
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
