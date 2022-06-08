const nacl = require('tweetnacl')

function hash(buf) {
  if (typeof buf === 'string') buf = Buffer.from(buf, 'utf8')
  else if (Buffer.isBuffer(buf)) buf = buf
  else throw new Error(`Type of ${typeof buf} is not valid to hash input`)
  const hash = nacl.hash(buf)
  return Buffer.from(hash).toString('hex')
}

module.exports = { hash }
