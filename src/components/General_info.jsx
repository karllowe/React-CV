import '/src/styles/form-section.css'

function GeneralInfo() {
    return (
        <div className="formSection">
            <form action="">
                <h2>General information:</h2>
                <label htmlFor="fullName">Full name:</label>
                <input type="text" id="fullName" name="full_name"/>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" />
            </form>
        </div>
    )
}

export default GeneralInfo