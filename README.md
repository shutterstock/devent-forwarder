# devent-forwarder

devent-forwarder accepts messages via http, udp or zmq and forwards
them on to the devent-hub.

## Server

    ./bin/forwarder --zmq-upstream tcp://hubhost:6666

## Clients

### http

    curl -d '{"bob": "ross"}' -H "Content-Type: application/json"  http://localhost:7664/painters.best

### udp

    use IO::Socket;
    use strict;
  
    my $sock = IO::Socket::INET->new(
      Proto    => 'udp',
      PeerPort => 7665,
      PeerAddr => 'localhost',
    ) or die "Could not create socket: $!\n";
  
    $sock->send( qq[painters.best\n{"bob": "ross"}] )
      or die "Send error: $!\n";

### zmq

    dr-send 'tcp://localhost:7666' painters.best <<EOF
      {"bob": "ross"}
    EOF

## Authors

This library was developed by Douglas Hunter at [Shutterstock](http://www.shutterstock.com).

## Contribute

Please do! Check out [the CONTRIBUTING guide](CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2012-2017 Shutterstock Images, LLC
