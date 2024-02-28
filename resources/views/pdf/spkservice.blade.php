<!DOCTYPE html>
<html>
    <head>
        <style>
            @page { margin: 0px; }
            body { margin: 15px; font-family: arial, sans-serif; }
            table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
            }

            td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
            }

            tr:nth-child(even) {
            background-color: #dddddd;
            }

            .header,
            .footer {
                width: 100%;
                text-align: center;
                position: fixed;
            }
            .header {
                top: 5px;
            }
            .footer {
                bottom: 0px;
            }
            .pagenum:before {
                content: counter(page);
            }

            hr {
                background-color:white;
                margin:0 0 45px 0;
                border-width:0;
            }

            hr.s1 {
                height:5px;
                border-top:1px solid black;
                border-bottom:2px solid black;
            }
        </style>
    </head>
    <body>
        <div style="text-align: center">
            <div style="text-align: center; font-size: 32px;padding-bottom: 15px"><span style="text-decoration: underline;"><strong>{{$header}}</strong></span></div>
            <div style="text-align: center; font-size: 16px;padding-bottom: 4px"><strong>{{$subHeader}}</strong></div>
            <div style="text-align: center;font-size: 13px;padding-bottom: 10px"><strong>{{$addr}}</strong></div>
        </div>

        <div>
            <hr class="s1">
        </div>
    </body>
</html>
