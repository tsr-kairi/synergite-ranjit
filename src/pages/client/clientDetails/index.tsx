const ClientDetails = () => {
  // Make API calls
  // http://localhost:4000/clients/1
  // https://react-query-v3.tanstack.com
  return (
    <div>
      <Personal data={data} />
      <Contacts data={data.contacts} />
      <Jobs data={data.jobs} />
    </div>
  )
}

export default ClientDetails
