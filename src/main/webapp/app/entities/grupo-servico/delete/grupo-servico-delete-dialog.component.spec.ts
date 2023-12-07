jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GrupoServicoService } from '../service/grupo-servico.service';

import { GrupoServicoDeleteDialogComponent } from './grupo-servico-delete-dialog.component';

describe('GrupoServico Management Delete Component', () => {
  let comp: GrupoServicoDeleteDialogComponent;
  let fixture: ComponentFixture<GrupoServicoDeleteDialogComponent>;
  let service: GrupoServicoService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, GrupoServicoDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(GrupoServicoDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(GrupoServicoDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(GrupoServicoService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      }),
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
