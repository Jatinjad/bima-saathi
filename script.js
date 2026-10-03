// ============================
// CONTACT FORM
// ============================

const claimForm = document.getElementById("claimForm");

claimForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const claimType = document.getElementById("claimType").value;
    const message = document.getElementById("message").value;

    try {

        const response = await fetch("/api/submit-claim", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                claimType: claimType,
                message: message
            })
        });

        const result = await response.json();

        if (response.ok) {

            alert(
                "Thank you, " + name +
                "! Your claim review request has been received."
            );

            claimForm.reset();

        } else {

            alert(result.message || "Something went wrong.");

        }

    } catch (error) {

        console.error(error);

        alert(
            "Unable to submit your request. Please try again later."
        );

    }

});