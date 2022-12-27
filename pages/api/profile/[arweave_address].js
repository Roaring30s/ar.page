import axios from "axios";

export default async function handler(req, res) {
  // Retrieve dynamic query variable
  const { arweave_address } = req.query;

  //const PROFILE_ENDPOINT = "https://ark-api.decent.land/v1/profile-metadata/arweave/";
  const PROFILE_ENDPOINT = "https://ark-core.decent.land/v2/profile-metadata/arweave/";
  try {
    const data = await axios.get(PROFILE_ENDPOINT+arweave_address);
    res.status(200).json(data.data)
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}