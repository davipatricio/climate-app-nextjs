export default function Head({ params }: { params: { city: string } }) {
  let city = decodeURIComponent(params.city)

  // uppercase each word
  city = city.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

  const title = `Clima em ${decodeURIComponent(city)}`

  return (
    <>
      <title>{title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="shortcut icon" href="favicon.png" type="image/png" />
    </>
  )
}
