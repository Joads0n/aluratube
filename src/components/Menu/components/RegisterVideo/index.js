import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

//Criação de um hook
function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues);

  return {
    values,
    handleChange: (event) => {
      const value = event.target.value;
      const name = event.target.name
      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm() {
      setValues({});
    }
  };
}

const PROJECT_URL = "https://qswkdqurfamdfinkalry.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzd2tkcXVyZmFtZGZpbmthbHJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg3MTgxNzUsImV4cCI6MTk4NDI5NDE3NX0.vOsL8L0f3Y33W64bOpofWJcl2Vq4EMRlvGBYrVp1spI";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: { titulo: "Frost punk", url: "https://www.youtube.com/watch?v=QsqatJxAUtk" }
  });
  const [formVisivel, setFormVisivel] = React.useState(true);

  return (
    <StyledRegisterVideo>
      <button
        className="add-video"
        onClick={() => setFormVisivel(true)}
      >
        +
      </button>
      {formVisivel
        ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              console.log(formCadastro.values);

              supabase.from("video").insert({
                title: formCadastro.values.titulo,
                url: formCadastro.values.url,
                thumb: getThumbnail(formCadastro.values.url),
                playlist: "jogos"
              }).then((resultado) => {
                console.log(resultado);
              }).catch((error) => {
                console.log(error);
              })

              setFormVisivel(false);
              formCadastro.clearForm();
            }}
          >
            <div>
              <button
                type="button"
                className="close-modal"
                onClick={() => setFormVisivel(false)}
              >
                X
              </button>
              <input
                placeholder="Titulo do vídeo"
                name="titulo"
                value={formCadastro.values.titulo}
                onChange={formCadastro.handleChange}
              />
              <input
                placeholder="URL"
                name="url"
                value={formCadastro.values.url}
                onChange={formCadastro.handleChange}
              />
              <button
                type="submit"
              >
                Cadastrar
              </button>
            </div>
          </form>
        )
        : false}
    </StyledRegisterVideo>
  )
}