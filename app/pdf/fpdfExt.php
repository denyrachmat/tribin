<?php
namespace app\pdf;

use Codedge\Fpdf\Fpdf\Fpdf;

class fpdfExt extends Fpdf {
    private $data;

    public function __construct($data)
    {
        $this->data = $data;
        parent::__construct('P', 'mm', 'A4');
        $this->SetA4();
        $this->SetTitle('My pdf title', true);
        $this->SetAuthor('TJGazel', true);
        $this->AddPage('L');
        $this->Body();
    }

    public function Header()
    {
        // fixed all pages
    }

    public function Body()
    {
        $this->SetFont('Arial', 'B', '24');
        $this->Cell(50, 25, $this->data->title);

        $this->SetFont('Arial', '', '14');
        $this->Cell(50, 25, $this->data->content);
    }

    public function Footer()
    {
        // fixed all pages
    }
}