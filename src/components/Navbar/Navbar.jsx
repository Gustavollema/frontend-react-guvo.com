import './Navbar.css'

function Navbar() {
    return (
        <>
        <section className="container-navbar">
            <img id="logo-guvo" src="../assets/images/logo.png" alt=""></img>
        <div className="menu">
            <button className="btn_menu">Adicionar</button>
            <button className="btn_menu">Editar</button>
            <button className="btn_menu">Deletar</button>
        </div>
        </section>
        </>
    );
}

export default Navbar