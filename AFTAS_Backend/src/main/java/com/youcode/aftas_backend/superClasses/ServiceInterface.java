package com.youcode.aftas_backend.superClasses;

import java.util.List;

public interface ServiceInterface<Dto, Identifier> {

    Dto save(final Dto dto);
    List<Dto> getAll();
    Dto update(final Identifier identifier, final Dto dto);
    void delete(final Identifier identifier);
    Dto find(final Identifier identifier);

}
