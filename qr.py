import qrcode

NUM_MESAS = 1  #Reemplazar número según cuántos QR se necesiten

URL_PAGINA = "http://emenu4.ddns.net/?mesa=1"

# Generar un QR para cada mesa
for i in range(1, NUM_MESAS + 1):
    nombre_archivo = f"qr_mesa{i}.png"
    qr = qrcode.make(URL_PAGINA)
    qr.save(nombre_archivo)
    print(f"✅ QR generado para mesa {i}: {URL_PAGINA}")