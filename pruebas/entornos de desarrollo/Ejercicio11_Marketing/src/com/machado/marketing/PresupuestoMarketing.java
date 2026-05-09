package com.machado.marketing;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.TitledBorder;
import javax.swing.JLabel;
import javax.swing.JTextField;
import javax.swing.JComboBox;
import javax.swing.JButton;
import javax.swing.JTextArea;
import java.awt.Font;
import java.awt.Color;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;

public class PresupuestoMarketing extends JFrame {

    private JPanel contentPane;
    private JTextField txtAntiguedad;
    private JComboBox<String> comboPack;
    private JComboBox<String> comboTipoEmpresa;
    private JButton btnValidar;
    
    private JComboBox<String> comboXXSS;
    private JComboBox<String> comboSEM;
    private JTextField txtDescuento;
    private JButton btnBorrarTodo;
    private JButton btnCalcular;
    
    private JTextField txtPrecioBase;
    private JTextField txtPrecioAntesImpuestos;
    private JTextField txtIVA;
    private JTextField txtTotal;
    
    private JTextArea txtErrores;

    private static final double PRECIO_BASICO = 200;
    private static final double PRECIO_ESTANDAR = 450;
    private static final double PRECIO_HOJA = 800;
    private static final double PRECIO_PREMIUM = 1200;
    
    private static final double PRECIO_XXSS = 150;
    private static final double PRECIO_SEM = 250;
    private static final double IVA_PORCENTAJE = 0.21;

    public static void main(String[] args) {
        PresupuestoMarketing frame = new PresupuestoMarketing();
        frame.setVisible(true);
    }

    public PresupuestoMarketing() {
        setTitle("Presupuesto Marketing Digital - Machado");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setBounds(100, 100, 700, 650);
        contentPane = new JPanel();
        setContentPane(contentPane);
        contentPane.setLayout(null);
        
        JPanel panelDatos = new JPanel();
        panelDatos.setBorder(new TitledBorder(null, "Datos cliente", TitledBorder.LEADING, TitledBorder.TOP, null, null));
        panelDatos.setBounds(10, 10, 664, 150);
        contentPane.add(panelDatos);
        panelDatos.setLayout(null);
        
        JLabel lblAntiguedad = new JLabel("Antigüedad empresa (años):");
        lblAntiguedad.setBounds(20, 30, 180, 20);
        panelDatos.add(lblAntiguedad);
        
        txtAntiguedad = new JTextField();
        txtAntiguedad.setToolTipText("Introduzca la antigüedad de la empresa (número entero entre 0 y 150)");
        txtAntiguedad.setBounds(210, 30, 100, 25);
        panelDatos.add(txtAntiguedad);
        
        JLabel lblPack = new JLabel("Pack de servicios:");
        lblPack.setBounds(20, 70, 150, 20);
        panelDatos.add(lblPack);
        
        comboPack = new JComboBox<String>();
        comboPack.setToolTipText("Seleccione el tipo de pack de servicios");
        comboPack.addItem("Seleccione...");
        comboPack.addItem("Básico");
        comboPack.addItem("Estándar");
        comboPack.addItem("Hoja");
        comboPack.addItem("Premium");
        comboPack.setBounds(210, 70, 150, 25);
        panelDatos.add(comboPack);
        
        JLabel lblTipoEmpresa = new JLabel("Tipo de negocio:");
        lblTipoEmpresa.setBounds(20, 110, 150, 20);
        panelDatos.add(lblTipoEmpresa);
        
        comboTipoEmpresa = new JComboBox<String>();
        comboTipoEmpresa.setToolTipText("Seleccione el tipo de empresa");
        comboTipoEmpresa.addItem("Seleccione...");
        comboTipoEmpresa.addItem("Autónomo");
        comboTipoEmpresa.addItem("PYME");
        comboTipoEmpresa.addItem("Gran empresa");
        comboTipoEmpresa.setBounds(210, 110, 150, 25);
        panelDatos.add(comboTipoEmpresa);
        
        btnValidar = new JButton("Validar");
        btnValidar.setBounds(400, 70, 120, 30);
        panelDatos.add(btnValidar);
        
        JPanel panelCampana = new JPanel();
        panelCampana.setBorder(new TitledBorder(null, "Campaña", TitledBorder.LEADING, TitledBorder.TOP, null, null));
        panelCampana.setBounds(10, 170, 664, 120);
        contentPane.add(panelCampana);
        panelCampana.setLayout(null);
        
        JLabel lblXXSS = new JLabel("Gestión de XXSS:");
        lblXXSS.setBounds(20, 30, 150, 20);
        panelCampana.add(lblXXSS);
        
        comboXXSS = new JComboBox<String>();
        comboXXSS.setToolTipText("¿Desea contratar gestión de redes sociales?");
        comboXXSS.addItem("Seleccione...");
        comboXXSS.addItem("SÍ");
        comboXXSS.addItem("NO");
        comboXXSS.setBounds(180, 30, 100, 25);
        comboXXSS.setEnabled(false);
        panelCampana.add(comboXXSS);
        
        JLabel lblSEM = new JLabel("Publicidad SEM:");
        lblSEM.setBounds(300, 30, 120, 20);
        panelCampana.add(lblSEM);
        
        comboSEM = new JComboBox<String>();
        comboSEM.setToolTipText("¿Desea contratar publicidad SEM (Google Ads)?");
        comboSEM.addItem("Seleccione...");
        comboSEM.addItem("SÍ");
        comboSEM.addItem("NO");
        comboSEM.setBounds(430, 30, 100, 25);
        comboSEM.setEnabled(false);
        panelCampana.add(comboSEM);
        
        JLabel lblDescuento = new JLabel("Dto. (€):");
        lblDescuento.setBounds(20, 75, 80, 20);
        panelCampana.add(lblDescuento);
        
        txtDescuento = new JTextField();
        txtDescuento.setToolTipText("Introduzca el descuento en euros (0 si no hay descuento)");
        txtDescuento.setBounds(100, 75, 100, 25);
        txtDescuento.setEnabled(false);
        panelCampana.add(txtDescuento);
        
        btnBorrarTodo = new JButton("Borrar todo");
        btnBorrarTodo.setBounds(250, 70, 120, 30);
        btnBorrarTodo.setEnabled(false);
        panelCampana.add(btnBorrarTodo);
        
        btnCalcular = new JButton("Calcular");
        btnCalcular.setBounds(400, 70, 120, 30);
        btnCalcular.setEnabled(false);
        panelCampana.add(btnCalcular);
        
        JPanel panelPrecios = new JPanel();
        panelPrecios.setBorder(new TitledBorder(null, "Precios", TitledBorder.LEADING, TitledBorder.TOP, null, null));
        panelPrecios.setBounds(10, 300, 664, 150);
        contentPane.add(panelPrecios);
        panelPrecios.setLayout(null);
        
        JLabel lblPrecioBase = new JLabel("Precio Base:");
        lblPrecioBase.setBounds(20, 30, 150, 20);
        panelPrecios.add(lblPrecioBase);
        
        txtPrecioBase = new JTextField();
        txtPrecioBase.setEditable(false);
        txtPrecioBase.setBackground(Color.LIGHT_GRAY);
        txtPrecioBase.setBounds(180, 30, 150, 25);
        panelPrecios.add(txtPrecioBase);
        
        JLabel lblPrecioAntes = new JLabel("Precio Antes de Impuestos:");
        lblPrecioAntes.setBounds(20, 65, 180, 20);
        panelPrecios.add(lblPrecioAntes);
        
        txtPrecioAntesImpuestos = new JTextField();
        txtPrecioAntesImpuestos.setEditable(false);
        txtPrecioAntesImpuestos.setBackground(Color.LIGHT_GRAY);
        txtPrecioAntesImpuestos.setBounds(180, 65, 150, 25);
        panelPrecios.add(txtPrecioAntesImpuestos);
        
        JLabel lblIVA = new JLabel("IVA (21%):");
        lblIVA.setBounds(20, 100, 100, 20);
        panelPrecios.add(lblIVA);
        
        txtIVA = new JTextField();
        txtIVA.setEditable(false);
        txtIVA.setBackground(Color.LIGHT_GRAY);
        txtIVA.setBounds(180, 100, 150, 25);
        panelPrecios.add(txtIVA);
        
        JLabel lblTotal = new JLabel("TOTAL:");
        lblTotal.setFont(new Font("Tahoma", Font.BOLD, 12));
        lblTotal.setBounds(350, 65, 80, 20);
        panelPrecios.add(lblTotal);
        
        txtTotal = new JTextField();
        txtTotal.setEditable(false);
        txtTotal.setBackground(Color.LIGHT_GRAY);
        txtTotal.setFont(new Font("Tahoma", Font.BOLD, 12));
        txtTotal.setBounds(430, 65, 150, 25);
        panelPrecios.add(txtTotal);
        
        JPanel panelErrores = new JPanel();
        panelErrores.setBorder(new TitledBorder(null, "Errores y Alertas", TitledBorder.LEADING, TitledBorder.TOP, null, null));
        panelErrores.setBounds(10, 460, 664, 140);
        contentPane.add(panelErrores);
        panelErrores.setLayout(null);
        
        txtErrores = new JTextArea();
        txtErrores.setEditable(false);
        txtErrores.setBackground(Color.LIGHT_GRAY);
        txtErrores.setLineWrap(true);
        txtErrores.setWrapStyleWord(true);
        txtErrores.setBounds(10, 20, 644, 110);
        panelErrores.add(txtErrores);
        
        btnValidar.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                validarDatos();
            }
        });
        
        btnCalcular.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                calcularPresupuesto();
            }
        });
        
        btnBorrarTodo.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                borrarTodo();
            }
        });
    }
    
    private void validarDatos() {
        txtErrores.setText("");
        
        String antiguedadStr = txtAntiguedad.getText().trim();
        if (antiguedadStr.isEmpty()) {
            txtErrores.setText("Error: La antigüedad es obligatoria.");
            txtAntiguedad.requestFocus();
            txtAntiguedad.selectAll();
            return;
        }
        
        int antiguedad;
        try {
            antiguedad = Integer.parseInt(antiguedadStr);
            if (antiguedad < 0 || antiguedad > 150) {
                txtErrores.setText("Error: La antigüedad debe ser un número entero entre 0 y 150.");
                txtAntiguedad.requestFocus();
                txtAntiguedad.selectAll();
                return;
            }
        } catch (NumberFormatException e) {
            txtErrores.setText("Error: La antigüedad introducida no es correcta (número entero entre 0 y 150).");
            txtAntiguedad.requestFocus();
            txtAntiguedad.selectAll();
            return;
        }
        
        if (comboPack.getSelectedIndex() == 0) {
            txtErrores.setText("Error: Debe seleccionar un pack de servicios.");
            comboPack.requestFocus();
            return;
        }
        
        if (comboTipoEmpresa.getSelectedIndex() == 0) {
            txtErrores.setText("Error: Debe seleccionar el tipo de empresa.");
            comboTipoEmpresa.requestFocus();
            return;
        }
        
        txtAntiguedad.setEnabled(false);
        comboPack.setEnabled(false);
        comboTipoEmpresa.setEnabled(false);
        btnValidar.setEnabled(false);
        
        comboXXSS.setEnabled(true);
        comboSEM.setEnabled(true);
        txtDescuento.setEnabled(true);
        btnBorrarTodo.setEnabled(true);
        btnCalcular.setEnabled(true);
        
        txtErrores.setText("Datos validados correctamente. Complete la sección Campaña.");
    }
    
    private void calcularPresupuesto() {
        txtErrores.setText("");
        
        if (comboXXSS.getSelectedIndex() == 0) {
            txtErrores.setText("Error: Debe indicar si desea gestión de redes sociales (SÍ o NO).");
            comboXXSS.requestFocus();
            return;
        }
        
        if (comboSEM.getSelectedIndex() == 0) {
            txtErrores.setText("Error: Debe indicar si desea publicidad SEM (SÍ o NO).");
            comboSEM.requestFocus();
            return;
        }
        
        String descuentoStr = txtDescuento.getText().trim();
        if (descuentoStr.isEmpty()) {
            txtErrores.setText("Error: Debe introducir el descuento (0 si no hay descuento).");
            txtDescuento.requestFocus();
            txtDescuento.selectAll();
            return;
        }
        
        double descuento;
        try {
            descuento = Double.parseDouble(descuentoStr);
            if (descuento < 0) {
                txtErrores.setText("Error: El descuento no puede ser negativo.");
                txtDescuento.requestFocus();
                txtDescuento.selectAll();
                return;
            }
        } catch (NumberFormatException e) {
            txtErrores.setText("Error: El formato del descuento no es correcto.");
            txtDescuento.requestFocus();
            txtDescuento.selectAll();
            return;
        }
        
        int antiguedad = Integer.parseInt(txtAntiguedad.getText().trim());
        String pack = (String) comboPack.getSelectedItem();
        String tipoEmpresa = (String) comboTipoEmpresa.getSelectedItem();
        boolean tieneXXSS = comboXXSS.getSelectedItem().equals("SÍ");
        boolean tieneSEM = comboSEM.getSelectedItem().equals("SÍ");
        
        double precioBase = 0;
        switch (pack) {
            case "Básico": precioBase = PRECIO_BASICO; break;
            case "Estándar": precioBase = PRECIO_ESTANDAR; break;
            case "Hoja": precioBase = PRECIO_HOJA; break;
            case "Premium": precioBase = PRECIO_PREMIUM; break;
        }
        
        if (descuento >= precioBase) {
            txtErrores.setText("Error: El descuento no puede ser mayor o igual al precio base del pack.");
            txtDescuento.requestFocus();
            txtDescuento.selectAll();
            return;
        }
        
        double factorAntiguedad = (antiguedad >= 10) ? 0.9 : 1.0;
        
        double factorEmpresa = 1.0;
        switch (tipoEmpresa) {
            case "Autónomo": factorEmpresa = 0.8; break;
            case "PYME": factorEmpresa = 1.0; break;
            case "Gran empresa": factorEmpresa = 1.2; break;
        }
        
        double precioAntesImpuestos = precioBase * factorAntiguedad * factorEmpresa;
        
        if (tieneXXSS) {
            precioAntesImpuestos += PRECIO_XXSS;
        }
        if (tieneSEM) {
            precioAntesImpuestos += PRECIO_SEM;
        }
        
        precioAntesImpuestos -= descuento;
        
        double iva = precioAntesImpuestos * IVA_PORCENTAJE;
        double total = precioAntesImpuestos + iva;
        
        txtPrecioBase.setText(String.format("%.2f €", precioBase));
        txtPrecioAntesImpuestos.setText(String.format("%.2f €", precioAntesImpuestos));
        txtIVA.setText(String.format("%.2f €", iva));
        txtTotal.setText(String.format("%.2f €", total));
    }
    
    private void borrarTodo() {
        txtAntiguedad.setEnabled(true);
        comboPack.setEnabled(true);
        comboTipoEmpresa.setEnabled(true);
        btnValidar.setEnabled(true);
        
        txtAntiguedad.setText("");
        comboPack.setSelectedIndex(0);
        comboTipoEmpresa.setSelectedIndex(0);
        
        comboXXSS.setEnabled(false);
        comboSEM.setEnabled(false);
        txtDescuento.setEnabled(false);
        btnBorrarTodo.setEnabled(false);
        btnCalcular.setEnabled(false);
        
        comboXXSS.setSelectedIndex(0);
        comboSEM.setSelectedIndex(0);
        txtDescuento.setText("");
        
        txtPrecioBase.setText("");
        txtPrecioAntesImpuestos.setText("");
        txtIVA.setText("");
        txtTotal.setText("");
        
        txtErrores.setText("");
        
        txtAntiguedad.requestFocus();
    }
}