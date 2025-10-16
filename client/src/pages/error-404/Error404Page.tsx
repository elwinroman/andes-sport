export function Error404Page() {
  return (
    <section className="grid place-content-center w-full h-full p-6 sm:p-8 md:p-10">
      <div className="flex items-center gap-10 flex-wrap">
        <div className="flex-1 grid md:place-content-end">
          <img
            src="https://ligasoccer.merku.love/static/media/404dark.6b1ae5a8219c2fa4558c.webp"
            alt="error 404"
            className="max-w-[400px] text-right w-full min-w-[300px]"
          />
        </div>

        <div className="flex flex-col items-start flex-1 gap-3">
          <h1 className="font-montserrat text-2xl font-bold flex flex-col sm:items-start">
            <span text-center sm:text-left>
              Opss!
            </span>
            <span className="text-center sm:text-left">La página que estás buscando no se ha encontrado.</span>
          </h1>

          <p className="text-secondary  text-center sm:text-left">Comprueba la URL en la barra de direcciones e inténtalo de nuevo.</p>
        </div>
      </div>
    </section>
  )
}
