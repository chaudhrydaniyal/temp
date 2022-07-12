import React from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { RMIUploader } from "react-multiple-image-uploader";

import axios from "axios";
import "./add.css";
const AddProperty = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const [propetyType, setPropertyType] = useState("");

  const [city, setCity] = useState("");
  const [purpose, setPurpose] = useState("");
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("1");
  const [washrooms, setWashrooms] = useState("1");
  const [landArea, setLandArea] = useState("");
  const [kitchen, setKitchen] = useState("1");
  const [storeRooms, setStoreRooms] = useState("1");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");




  const [visible, setVisible] = useState(false);
  const handleSetVisible = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const onUpload = (data) => {
    console.log("Upload files", data);
  };
  const onSelect = (data) => {
    console.log("Select files", data);
  };
  const onRemove = (id) => {
    console.log("Remove image id", id);
  };



  //upload images


  // converting base64 to blob
  function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  function imagetoblob(ImgId) {
    var ImageURL = document.getElementById(ImgId).getAttribute('src');
    // Split the base64 string in data and contentType
    var block = ImageURL.split(";");
    // Get the content type of the image
    var contentType = block[0].split(":")[1];// In this case "image/gif"
    // get the real base64 content of the file
    var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."
    // Convert it to a blob to upload
    return b64toBlob(realData, contentType);
  }

  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleSubmit = async (event) => {
    // event.preventDefault()
    const formData = new FormData();
    console.log("selectedFile", event[0].file)
    for (let i=0; i<event.length; i++){
    formData.append("uploadedImages", event[i].file);
    }

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/properties/addproperty",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }








  return (
    <>
      <div style={{ marginTop: "100px", padding: "20px" }}>
        <Container>
          <Card className="p-5 res">
            <h3>Add Property</h3>
            <Card style={{ border: "none" }}>
              <Form
                onSubmit={() => {
                  console.log(
                    "property show",
                    title,
                    price,
                    propetyType,
                    city,
                    purpose,
                    area,
                    bedrooms,
                    washrooms,
                    landArea,
                    kitchen,
                    storeRooms,
                    location,
                    description
                  );

                  axios
                    .post("http://localhost:8000/properties/addproperty", {
                      propertytitle: title,
                      price: parseFloat(price),
                      propertytype: propetyType,
                      city: city,
                      purpose: purpose,
                      area: area,
                      rooms: bedrooms,
                      bath: washrooms,
                      area: landArea,
                      kitchen: kitchen,
                      storeroom: storeRooms,
                      location: location,
                      description: description,
                    }, { withCredentials: true })
                    .then((res) => {

                      console.log("property added");

                    })
                    .catch((err) => {
                      console.log("property data submit error: ", err);
                    });
                }}
              >
                <div className="res">
                  <div>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      placeholder="Title"
                      className="dd"
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    ></Form.Control>
                    <Form.Label className="mt-3">Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="price"
                      className="dd"
                      onChange={(e) => setPrice(e.target.value)}
                      required

                    ></Form.Control>
                  </div>
                </div>
                <div className="ff">
                  <div>
                    <Form.Label className="mt-3 select">
                      Property type
                    </Form.Label>
                    <Form.Select
                      onChange={(e) => setPropertyType(e.target.value)}
                      required

                    >
                      <option value="" disabled selected >
                        Select the Type
                      </option>
                      <option>flat</option>
                      <option>home</option>
                      <option>plot</option>
                    </Form.Select>
                  </div>
                  <div>
                    <Form.Label className="mt-3 select">City</Form.Label>
                    <Form.Select onChange={(e) => setCity(e.target.value)}

                      required

                    >
                      <option value="" disabled selected>
                        Select The City
                      </option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="" disabled>
                        Punjab Cities
                      </option>
                      <option value="Ahmed Nager Chatha">
                        Ahmed Nager Chatha
                      </option>
                      <option value="Ahmadpur East">Ahmadpur East</option>
                      <option value="Ali Khan Abad">Ali Khan Abad</option>
                      <option value="Alipur">Alipur</option>
                      <option value="Arifwala">Arifwala</option>
                      <option value="Attock">Attock</option>
                      <option value="Bhera">Bhera</option>
                      <option value="Bhalwal">Bhalwal</option>
                      <option value="Bahawalnagar">Bahawalnagar</option>
                      <option value="Bahawalpur">Bahawalpur</option>
                      <option value="Bhakkar">Bhakkar</option>
                      <option value="Burewala">Burewala</option>
                      <option value="Chillianwala">Chillianwala</option>
                      <option value="Chakwal">Chakwal</option>
                      <option value="Chichawatni">Chichawatni</option>
                      <option value="Chiniot">Chiniot</option>
                      <option value="Chishtian">Chishtian</option>
                      <option value="Daska">Daska</option>
                      <option value="Darya Khan">Darya Khan</option>
                      <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
                      <option value="Dhaular">Dhaular</option>
                      <option value="Dina">Dina</option>
                      <option value="Dinga">Dinga</option>
                      <option value="Dipalpur">Dipalpur</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Ferozewala">Ferozewala</option>
                      <option value="Fateh Jhang">Fateh Jang</option>
                      <option value="Ghakhar Mandi">Ghakhar Mandi</option>
                      <option value="Gojra">Gojra</option>
                      <option value="Gujranwala">Gujranwala</option>
                      <option value="Gujrat">Gujrat</option>
                      <option value="Gujar Khan">Gujar Khan</option>
                      <option value="Hafizabad">Hafizabad</option>
                      <option value="Haroonabad">Haroonabad</option>
                      <option value="Hasilpur">Hasilpur</option>
                      <option value="Haveli Lakha">Haveli Lakha</option>
                      <option value="Jatoi">Jatoi</option>
                      <option value="Jalalpur">Jalalpur</option>
                      <option value="Jattan">Jattan</option>
                      <option value="Jampur">Jampur</option>
                      <option value="Jaranwala">Jaranwala</option>
                      <option value="Jhang">Jhang</option>
                      <option value="Jhelum">Jhelum</option>
                      <option value="Kalabagh">Kalabagh</option>
                      <option value="Karor Lal Esan">Karor Lal Esan</option>
                      <option value="Kasur">Kasur</option>
                      <option value="Kamalia">Kamalia</option>
                      <option value="Kamoke">Kamoke</option>
                      <option value="Khanewal">Khanewal</option>
                      <option value="Khanpur">Khanpur</option>
                      <option value="Kharian">Kharian</option>
                      <option value="Khushab">Khushab</option>
                      <option value="Kot Addu">Kot Addu</option>
                      <option value="Jauharabad">Jauharabad</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Lalamusa">Lalamusa</option>
                      <option value="Layyah">Layyah</option>
                      <option value="Liaquat Pur">Liaquat Pur</option>
                      <option value="Lodhran">Lodhran</option>
                      <option value="Malakwal">Malakwal</option>
                      <option value="Mamoori">Mamoori</option>
                      <option value="Mailsi">Mailsi</option>
                      <option value="Mandi Bahauddin">Mandi Bahauddin</option>
                      <option value="Mian Channu">Mian Channu</option>
                      <option value="Mianwali">Mianwali</option>
                      <option value="Multan">Multan</option>
                      <option value="Murree">Murree</option>
                      <option value="Muridke">Muridke</option>
                      <option value="Mianwali Bangla">Mianwali Bangla</option>
                      <option value="Muzaffargarh">Muzaffargarh</option>
                      <option value="Narowal">Narowal</option>
                      <option value="Nankana Sahib">Nankana Sahib</option>
                      <option value="Okara">Okara</option>
                      <option value="Renala Khurd">Renala Khurd</option>
                      <option value="Pakpattan">Pakpattan</option>
                      <option value="Pattoki">Pattoki</option>
                      <option value="Pir Mahal">Pir Mahal</option>
                      <option value="Qaimpur">Qaimpur</option>
                      <option value="Qila Didar Singh">Qila Didar Singh</option>
                      <option value="Rabwah">Rabwah</option>
                      <option value="Raiwind">Raiwind</option>
                      <option value="Rajanpur">Rajanpur</option>
                      <option value="Rahim Yar Khan">Rahim Yar Khan</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Sadiqabad">Sadiqabad</option>
                      <option value="Safdarabad">Safdarabad</option>
                      <option value="Sahiwal">Sahiwal</option>
                      <option value="Sangla Hill">Sangla Hill</option>
                      <option value="Sarai Alamgir">Sarai Alamgir</option>
                      <option value="Sargodha">Sargodha</option>
                      <option value="Shakargarh">Shakargarh</option>
                      <option value="Sheikhupura">Sheikhupura</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Sohawa">Sohawa</option>
                      <option value="Soianwala">Soianwala</option>
                      <option value="Siranwali">Siranwali</option>
                      <option value="Talagang">Talagang</option>
                      <option value="Taxila">Taxila</option>
                      <option value="Toba Tek Singh">Toba Tek Singh</option>
                      <option value="Vehari">Vehari</option>
                      <option value="Wah Cantonment">Wah Cantonment</option>
                      <option value="Wazirabad">Wazirabad</option>
                      <option value="" disabled>
                        Sindh Cities
                      </option>
                      <option value="Badin">Badin</option>
                      <option value="Bhirkan">Bhirkan</option>
                      <option value="Rajo Khanani">Rajo Khanani</option>
                      <option value="Chak">Chak</option>
                      <option value="Dadu">Dadu</option>
                      <option value="Digri">Digri</option>
                      <option value="Diplo">Diplo</option>
                      <option value="Dokri">Dokri</option>
                      <option value="Ghotki">Ghotki</option>
                      <option value="Haala">Haala</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Islamkot">Islamkot</option>
                      <option value="Jacobabad">Jacobabad</option>
                      <option value="Jamshoro">Jamshoro</option>
                      <option value="Jungshahi">Jungshahi</option>
                      <option value="Kandhkot">Kandhkot</option>
                      <option value="Kandiaro">Kandiaro</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Kashmore">Kashmore</option>
                      <option value="Keti Bandar">Keti Bandar</option>
                      <option value="Khairpur">Khairpur</option>
                      <option value="Kotri">Kotri</option>
                      <option value="Larkana">Larkana</option>
                      <option value="Matiari">Matiari</option>
                      <option value="Mehar">Mehar</option>
                      <option value="Mirpur Khas">Mirpur Khas</option>
                      <option value="Mithani">Mithani</option>
                      <option value="Mithi">Mithi</option>
                      <option value="Mehrabpur">Mehrabpur</option>
                      <option value="Moro">Moro</option>
                      <option value="Nagarparkar">Nagarparkar</option>
                      <option value="Naudero">Naudero</option>
                      <option value="Naushahro Feroze">Naushahro Feroze</option>
                      <option value="Naushara">Naushara</option>
                      <option value="Nawabshah">Nawabshah</option>
                      <option value="Nazimabad">Nazimabad</option>
                      <option value="Qambar">Qambar</option>
                      <option value="Qasimabad">Qasimabad</option>
                      <option value="Ranipur">Ranipur</option>
                      <option value="Ratodero">Ratodero</option>
                      <option value="Rohri">Rohri</option>
                      <option value="Sakrand">Sakrand</option>
                      <option value="Sanghar">Sanghar</option>
                      <option value="Shahbandar">Shahbandar</option>
                      <option value="Shahdadkot">Shahdadkot</option>
                      <option value="Shahdadpur">Shahdadpur</option>
                      <option value="Shahpur Chakar">Shahpur Chakar</option>
                      <option value="Shikarpaur">Shikarpaur</option>
                      <option value="Sukkur">Sukkur</option>
                      <option value="Tangwani">Tangwani</option>
                      <option value="Tando Adam Khan">Tando Adam Khan</option>
                      <option value="Tando Allahyar">Tando Allahyar</option>
                      <option value="Tando Muhammad Khan">
                        Tando Muhammad Khan
                      </option>
                      <option value="Thatta">Thatta</option>
                      <option value="Umerkot">Umerkot</option>
                      <option value="Warah">Warah</option>
                      <option value="" disabled>
                        Khyber Cities
                      </option>
                      <option value="Abbottabad">Abbottabad</option>
                      <option value="Adezai">Adezai</option>
                      <option value="Alpuri">Alpuri</option>
                      <option value="Akora Khattak">Akora Khattak</option>
                      <option value="Ayubia">Ayubia</option>
                      <option value="Banda Daud Shah">Banda Daud Shah</option>
                      <option value="Bannu">Bannu</option>
                      <option value="Batkhela">Batkhela</option>
                      <option value="Battagram">Battagram</option>
                      <option value="Birote">Birote</option>
                      <option value="Chakdara">Chakdara</option>
                      <option value="Charsadda">Charsadda</option>
                      <option value="Chitral">Chitral</option>
                      <option value="Daggar">Daggar</option>
                      <option value="Dargai">Dargai</option>
                      <option value="Darya Khan">Darya Khan</option>
                      <option value="Dera Ismail Khan">Dera Ismail Khan</option>
                      <option value="Doaba">Doaba</option>
                      <option value="Dir">Dir</option>
                      <option value="Drosh">Drosh</option>
                      <option value="Hangu">Hangu</option>
                      <option value="Haripur">Haripur</option>
                      <option value="Karak">Karak</option>
                      <option value="Kohat">Kohat</option>
                      <option value="Kulachi">Kulachi</option>
                      <option value="Lakki Marwat">Lakki Marwat</option>
                      <option value="Latamber">Latamber</option>
                      <option value="Madyan">Madyan</option>
                      <option value="Mansehra">Mansehra</option>
                      <option value="Mardan">Mardan</option>
                      <option value="Mastuj">Mastuj</option>
                      <option value="Mingora">Mingora</option>
                      <option value="Nowshera">Nowshera</option>
                      <option value="Paharpur">Paharpur</option>
                      <option value="Pabbi">Pabbi</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Saidu Sharif">Saidu Sharif</option>
                      <option value="Shorkot">Shorkot</option>
                      <option value="Shewa Adda">Shewa Adda</option>
                      <option value="Swabi">Swabi</option>
                      <option value="Swat">Swat</option>
                      <option value="Tangi">Tangi</option>
                      <option value="Tank">Tank</option>
                      <option value="Thall">Thall</option>
                      <option value="Timergara">Timergara</option>
                      <option value="Tordher">Tordher</option>
                      <option value="" disabled>
                        Balochistan Cities
                      </option>
                      <option value="Awaran">Awaran</option>
                      <option value="Barkhan">Barkhan</option>
                      <option value="Chagai">Chagai</option>
                      <option value="Dera Bugti">Dera Bugti</option>
                      <option value="Gwadar">Gwadar</option>
                      <option value="Harnai">Harnai</option>
                      <option value="Jafarabad">Jafarabad</option>
                      <option value="Jhal Magsi">Jhal Magsi</option>
                      <option value="Kacchi">Kacchi</option>
                      <option value="Kalat">Kalat</option>
                      <option value="Kech">Kech</option>
                      <option value="Kharan">Kharan</option>
                      <option value="Khuzdar">Khuzdar</option>
                      <option value="Killa Abdullah">Killa Abdullah</option>
                      <option value="Killa Saifullah">Killa Saifullah</option>
                      <option value="Kohlu">Kohlu</option>
                      <option value="Lasbela">Lasbela</option>
                      <option value="Lehri">Lehri</option>
                      <option value="Loralai">Loralai</option>
                      <option value="Mastung">Mastung</option>
                      <option value="Musakhel">Musakhel</option>
                      <option value="Nasirabad">Nasirabad</option>
                      <option value="Nushki">Nushki</option>
                      <option value="Panjgur">Panjgur</option>
                      <option value="Pishin Valley">Pishin Valley</option>
                      <option value="Quetta">Quetta</option>
                      <option value="Sherani">Sherani</option>
                      <option value="Sibi">Sibi</option>
                      <option value="Sohbatpur">Sohbatpur</option>
                      <option value="Washuk">Washuk</option>
                      <option value="Zhob">Zhob</option>
                      <option value="Ziarat">Ziarat</option>
                    </Form.Select>
                  </div>
                  <div>
                    <Form.Label className="mt-3">Purpose</Form.Label>
                    <Form.Select
                      className="select"

                      onChange={(e) => setPurpose(e.target.value)}
                      required

                    >
                      <option value="" disabled selected>
                        purpose
                      </option>
                      <option>sale</option>
                      <option>rent</option>
                    </Form.Select>
                  </div>
                  <div>
                    <Form.Label className="mt-3">Area</Form.Label>
                    <Form.Control
                      placeholder="area"
                      className="select"
                      onChange={(e) => setLandArea(e.target.value)}
                      required

                    ></Form.Control>
                  </div>
                </div>
                <div className="ff">
                  <div>
                    <Form.Label className="mt-3">Rooms</Form.Label>
                    <Form.Select
                      className="select"
                      onChange={(e) => setBedrooms(e.target.value)}
                      required

                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6+</option>
                    </Form.Select>
                  </div>
                  <div>
                    <Form.Label className="mt-3">baths</Form.Label>
                    <Form.Select
                      className="select"
                      onChange={(e) => setWashrooms(e.target.value)}
                      required

                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4+</option>
                    </Form.Select>
                  </div>
                  <div>
                    <Form.Label className="mt-3">Kitchen</Form.Label>
                    <Form.Select
                      className="select"
                      onChange={(e) => setKitchen(e.target.value)}
                      required

                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3+</option>
                    </Form.Select>
                  </div>
                  <div>
                    <Form.Label className="mt-3">Store Rooms</Form.Label>
                    <Form.Select
                      className="select"
                      onChange={(e) => setStoreRooms(e.target.value)}
                      required

                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3+</option>
                    </Form.Select>
                  </div>
                </div>
                <div className="res">
                  <div>
                    <Form.Label className="mt-3 dd">Location</Form.Label>
                    <Form.Control
                      placeholder="street address"
                      onChange={(e) => setLocation(e.target.value)}
                      required

                    ></Form.Control>
                    <Form.Label className="mt-3 dd">Description</Form.Label>
                    <Form.Control
                      as={"textarea"}
                      rows={"4"}
                      className="tex"
                      onChange={(e) => setDescription(e.target.value)}
                      required

                    ></Form.Control>
                  </div>
                </div>




                <Button variant="success" className="mt-3" type="submit">
                  Add Property
                </Button>
              </Form>


              <Form onSubmit={handleSubmit}>
                <Form.Control type="file" onChange={handleFileSelect}></Form.Control>
                <Button type="submit"
                // onClick={() => {

                //   axios
                //     .post("http://localhost:8000/properties/addproperty", {

                //     })
                //   .then((res) => {

                //     console.log("property added");

                //   })
                //   .catch((err) => {
                //     console.log("property data submit error: ", err);
                //   })
                // }}


                > submit</Button>
              </Form>

              <RMIUploader
                isOpen={visible}
                hideModal={hideModal}
                onSelect={onSelect}
                onUpload={handleSubmit}
                onRemove={onRemove}
              />


            </Card>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default AddProperty;
