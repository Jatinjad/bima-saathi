```javascript
// ============================
// FAQ ACCORDION
// ============================

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const faq = question.parentElement;

        faq.classList.toggle("active");

        const symbol = question.querySelector("span");

        if (faq.classList.contains("active")) {
            symbol.textContent = "−";
        } else {
            symbol.textContent = "+";
        }

    });

});


// ============================
// CONTACT FORM
// ============================

const claimForm = document.getElementById("claimForm");

claimForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value;

    alert(
        "Thank you, " + name +
        "! Your claim review request has been received."
    );

    claimForm.reset();

});
```
