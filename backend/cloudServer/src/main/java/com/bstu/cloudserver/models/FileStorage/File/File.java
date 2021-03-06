package com.bstu.cloudserver.models.FileStorage.File;

import com.bstu.cloudserver.models.Client.Client;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;


@Entity
@RequiredArgsConstructor
@NoArgsConstructor
public class File implements Serializable {

    @Id
    @Column(name = "uuid")
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Getter
    @Setter
    private String token;


    @OneToOne
    @JoinColumn(name = "Client")
    @NonNull
    private Client client;

    @Column(name = "Expire")
    @Getter
    @Setter
    @NonNull
    private LocalDateTime expires;

}


