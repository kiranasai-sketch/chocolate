function parseCSV(t){const r=[];let row=[],c="",q=false;for(let i=0;i<t.length;i++){const ch=t[i];
 if(q){if(ch=='"'){if(t[i+1]=='"'){c+='"';i++}else q=false}else c+=ch}
 else if(ch=='"')q=true;else if(ch==','){row.push(c);c=""}
 else if(ch=='\n'){row.push(c);r.push(row);row=[];c=""}else if(ch!='\r')c+=ch}
 if(c||row.length){row.push(c);r.push(row)}return r}
async function loadProducts(){
 const u=CONFIG.PRODUCTS_CSV_URL; if(!u) return DEMO_PRODUCTS;
 const rows=parseCSV(await (await fetch(u)).text()); const h=rows.shift();
 const ix=n=>h.findIndex(x=>x.trim()==n);
 return rows.filter(r=>r[ix("SKU")]).map(r=>({sku:r[ix("SKU")].trim(),name:r[ix("ชื่อสินค้า")],desc:r[ix("รายละเอียด")],
  price:+r[ix("ราคา")],stock:+r[ix("สต็อก")],image:r[ix("ชื่อไฟล์รูป")],shelf:r[ix("ตำแหน่งชั้น")]}));
}
const baht=n=>"฿"+Number(n).toLocaleString("th-TH");
