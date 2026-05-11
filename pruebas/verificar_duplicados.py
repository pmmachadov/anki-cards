#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Verifica preguntas duplicadas entre archivos de pruebas.
"""
import os
import re
from collections import defaultdict
from pathlib import Path

BASE_DIR = Path("/c/Users/Pablo/anki-cards/pruebas")

def clean_block(text):
    """Normaliza un bloque de texto para comparación."""
    text = text.lower().strip()
    # Quitar múltiples espacios
    text = re.sub(r'\s+', ' ', text)
    # Quitar líneas de encabezado comunes
    skip_prefixes = (
        'formació professional',
        'codi:',
        'pàgina',
        'versió:',
        'lliurament:',
        'nom i cognoms',
        'credits:',
        'generalitat de catalunya',
        'departament d\'educació',
        'institut obert de catalunya',
        'cfgs desenvolupament',
        'exercici d\'avaluació contínua',
        'presentació i resultats',
        'criteris d\'avaluació',
        'forma i data de lliurament',
        'nota:',
        'notes importants',
        'important!',
        'activitat ',
        'espai per les respostes',
        'respuesta:',
        'resposta:',
    )
    for prefix in skip_prefixes:
        if text.startswith(prefix):
            return ""
    return text

def get_significant_blocks(filepath, min_len=40):
    """Extrae bloques de texto significativos de un archivo."""
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        print(f"Error leyendo {filepath}: {e}")
        return []
    
    # Dividir en párrafos (bloques separados por líneas en blanco)
    paragraphs = re.split(r'\n\s*\n', content)
    blocks = []
    for p in paragraphs:
        cleaned = clean_block(p)
        if len(cleaned) >= min_len:
            blocks.append(cleaned)
    return blocks

def find_duplicates():
    # Definir archivos relevantes por materia
    files_by_subject = {
        'SI (Sistemes Informàtics)': [
            BASE_DIR / 'si_eac1.txt',
            BASE_DIR / 'si_eac2.txt',
            BASE_DIR / 'si_eac3.txt',
            BASE_DIR / 'si_da2_0483_eac1_pablo_m.txt',
            BASE_DIR / 'si_da2_0483_eac2_machado_v.txt',
            BASE_DIR / 'si_da2_0483_eac3_machado_v.txt',
        ],
        'DWEC (Desenvolupament Web Client)': [
            BASE_DIR / 'desarrollo web en entorno cliente' / 'guia-dwec.md',
            BASE_DIR / 'eac1_texto.txt',
            BASE_DIR / 'ex1' / 'ex1.html',
            BASE_DIR / 'ex2' / 'ex2.html',
            BASE_DIR / 'ex3' / 'ex3.html',
            BASE_DIR / 'ex4' / 'ex4.html',
            BASE_DIR / 'ex5' / 'ex5.html',
            BASE_DIR / 'ejercicios' / 'server.js',
        ],
        'ED (Entorns de Desenvolupament)': [
            BASE_DIR / 'entornos de desarrollo' / 'guia-ed.md',
            BASE_DIR / 'entornos de desarrollo' / 'ejercicio-12' / 'HELP.md',
        ],
    }
    
    report_lines = []
    report_lines.append("=" * 70)
    report_lines.append("INFORME DE VERIFICACIÓN DE PREGUNTAS REPETIDAS")
    report_lines.append("=" * 70)
    
    total_duplicates = 0
    
    for subject, files in files_by_subject.items():
        report_lines.append(f"\n{'='*70}")
        report_lines.append(f"MATERIA: {subject}")
        report_lines.append(f"{'='*70}")
        
        # Filtrar archivos que existen
        existing_files = [f for f in files if f.exists()]
        if len(existing_files) < 2:
            report_lines.append("  (Menos de 2 archivos para comparar)")
            continue
        
        # Recolectar bloques de cada archivo
        file_blocks = {}
        for filepath in existing_files:
            blocks = get_significant_blocks(filepath)
            file_blocks[filepath] = blocks
            report_lines.append(f"  Archivo: {filepath.name} -> {len(blocks)} bloques significativos")
        
        # Buscar duplicados entre pares de archivos
        found_any = False
        for i in range(len(existing_files)):
            for j in range(i+1, len(existing_files)):
                f1 = existing_files[i]
                f2 = existing_files[j]
                blocks1 = file_blocks[f1]
                blocks2 = file_blocks[f2]
                
                # Usar un umbral de similitud: buscar bloques que compartan al menos 50 caracteres consecutivos
                # o que sean prácticamente idénticos
                set1 = set(blocks1)
                set2 = set(blocks2)
                common = set1 & set2
                
                # También buscar subcadenas largas comunes dentro de bloques similares
                similar_pairs = []
                for b1 in blocks1:
                    for b2 in blocks2:
                        if b1 == b2:
                            similar_pairs.append((b1, b2))
                        elif len(b1) > 80 and len(b2) > 80:
                            # Buscar si uno está contenido en el otro o comparten una parte larga
                            if b1 in b2 or b2 in b1:
                                similar_pairs.append((b1, b2))
                
                unique_similars = []
                seen = set()
                for b1, b2 in similar_pairs:
                    key = b1[:100]
                    if key not in seen:
                        seen.add(key)
                        unique_similars.append((b1, b2))
                
                if unique_similars:
                    found_any = True
                    total_duplicates += len(unique_similars)
                    report_lines.append(f"\n  --- Duplicados entre {f1.name} y {f2.name} ({len(unique_similars)} encontrados) ---")
                    for idx, (b1, b2) in enumerate(unique_similars[:5], 1):  # Mostrar máximo 5 ejemplos
                        preview = b1[:200].replace('\n', ' ')
                        report_lines.append(f"    [{idx}] {preview}...")
                    if len(unique_similars) > 5:
                        report_lines.append(f"    ... y {len(unique_similars) - 5} más.")
        
        if not found_any:
            report_lines.append("  No se encontraron preguntas/bloques repetidos entre los archivos de esta materia.")
    
    report_lines.append(f"\n{'='*70}")
    report_lines.append(f"TOTAL DE BLOQUES REPETIDOS ENCONTRADOS: {total_duplicates}")
    report_lines.append(f"{'='*70}")
    
    # Guardar informe
    report_path = BASE_DIR / 'informe_duplicados.txt'
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(report_lines))
    
    print('\n'.join(report_lines))
    print(f"\nInforme guardado en: {report_path}")

if __name__ == '__main__':
    find_duplicates()
