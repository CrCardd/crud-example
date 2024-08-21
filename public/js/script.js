let image = document.getElementById('new_custom_image');
let file = document.getElementById('input_image_archive');
image.addEventListener('click', () => 
    {
        file.click()
    })

file.addEventListener('change', () => 
    {
        if (file.files.length == 0) {
            return;
        }

        let reader = new FileReader();
    
        reader.readAsDataURL(file.files[0]);
        
        reader.onload = () => {
            image.src = reader.result
        }
    })



let button_save_class = document.getElementById('button_class_register');
button_save_class.addEventListener('click', () => {
        document.getElementById('class_register').submit()
    }
)


let button_save_student = document.getElementById('button_student_register');
button_save_student.addEventListener('click', () => {
    document.getElementById('student_register').submit()
    }
)


