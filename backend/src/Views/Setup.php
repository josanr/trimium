<?php


namespace Views;


class Setup extends BaseView
{

    public function render(): string
    {
        $html = '
            <div class="row">
                <input type="file" id="file-container" />
                <button id="upload" class="btn btn-primary">Upload</button>
            </div>
            
            <script>
                "use strict";
                const fileHolder = document.getElementById("file-container");
                const uploadHolder = document.getElementById("upload");
                uploadHolder.addEventListener("click", ev => {
                    if (fileHolder.files.length === 0){
                        window.alert("Файл не выбран");
                        return false;
                    }
                    
                
                    const reader = new FileReader();
                    reader.addEventListener("load", ev => {
                        
                        fetch("/setup/file/", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "X-Requested-With": "XMLHttpRequest"
                            },
                            body: JSON.stringify({
                                fileData: ev.target.result.split(",")[1]
                            }),
                        })
                        .then(response => {
                            console.log(response.json())
//                            window.alert("Файл загружен.")
                        });
                    });
                    reader.readAsDataURL(fileHolder.files[0]);
                });
            </script>
        ';

        return $html;
    }
}