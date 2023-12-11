import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';
import { ApprenantService } from '../shared/apprenant.service';
import { Apprenant } from '../shared/apprenant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PromoService } from '../shared/promo.service';
import { Input } from '@angular/core';
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-apprenant-add-dialog',
  templateUrl: './apprenant-add-dialog.component.html',
  styleUrls: ['./apprenant-add-dialog.component.scss'],



})


export class ApprenantAddDialogComponent {
  apprenantForm!: FormGroup;
    submitted = false;
    promo: number = 0;
    ref: number = 0;
    @Input() referentiel:number;
    @Input() promotion:number;
    selectedFile: ImageSnippet;
    formData = new FormData();
    isChanged : boolean = false;
    imageShow: any = "assets/img/user/user11.jpg";
    file: any;

    constructor(
        public dialogRef: MatDialogRef<ApprenantAddDialogComponent>,
        private formBuilder: FormBuilder,
        public apprenantServices: ApprenantService,
        private route: ActivatedRoute,
        private router: Router,

    ) {

  }

    ngOnInit(){


      this.apprenantForm = this.formBuilder.group({
        nom: ['', [Validators.required, Validators.maxLength(255)]],
        prenom: ['', [Validators.required, Validators.maxLength(255)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
        password: ['', [Validators.maxLength(255)]],
        date_naissance: ['', [Validators.required]],
        lieu_naissance: ['', [Validators.maxLength(255)]],
        telephone: ['', [Validators.required, Validators.pattern(/^([0-9\s\-\+\(\)]*)$/), Validators.maxLength(255)]],
        cni: ['', [Validators.required, Validators.pattern(/^([0-9]*)$/), Validators.maxLength(255)]],
        genre: ['', [Validators.required]],
        photo: [''],
      });
      }
      get form() {
        return this.apprenantForm.controls ;
      }





    close(){
        this.dialogRef.close(true);
    }

/**
    * position sweet alert
 * @param position modal content
 */
    successAlert(description:string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: description,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  wrongAlert(description:string) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: description,
      })
  }
  onFileSelected(event: any)  {
    this.file= event.target.files[0];
  }

    saveApprenant() {
      if (this.file) {
        this.formData.append('photo', this.file);

      }
      if (this.apprenantForm.valid) {

        this.formData.append('nom', this.apprenantForm.get('nom')?.value);
        this.formData.append('prenom', this.apprenantForm.get('prenom')?.value);
        this.formData.append('email', this.apprenantForm.get('email')?.value);
        this.formData.append('date_naissance',new Date(this.apprenantForm.get('date_naissance')?.value).toISOString().substring(0, 10).replace(/-/g, '/'));
        this.formData.append('lieu_naissance', this.apprenantForm.get('lieu_naissance')?.value);
        this.formData.append('genre', this.apprenantForm.get('genre')?.value);
        this.formData.append('cni', this.apprenantForm.get('cni')?.value);
        this.formData.append('telephone', this.apprenantForm.get('telephone')?.value);




        this.apprenantServices.postApprenant( this.formData,this.promotion,this.referentiel).subscribe({
          next: data => {
            this.successAlert('Apprenant ajouté avec succès.');
            this.apprenantServices.apprenantUpdate.emit();
          },
          error: error => {
            this.wrongAlert('Erreur lors de l\'ajout de \'Apprenant.');
          }
        });

        this.dialogRef.close(true);




      }

      this.submitted = true
    }

    onFileChange(event: any) {
        this.isChanged = true;
        this.file = event.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {

          this.imageShow = (<FileReader>event.target).result;


        }
      }

}


@Component({
    selector: 'create-add-exel',
    templateUrl: 'apprenant-add-excel.component.html',
    providers: [PromoService,ApprenantService]

})
export class ApprenantAddExcelComponent  {
    promo: number=0;
    ref: number=0;
    refId: any ;
    @Input()promo_id :number
    @Input()ref_id :number
    constructor(
        public dialogRef: MatDialogRef<ApprenantAddExcelComponent>,
        public themeService: CustomizerSettingsService,
        public apprenantServices: ApprenantService,
        private route: ActivatedRoute,
        private router: Router,



    ) {

    }
    onInit(){
        this.route.params.subscribe(params => {
            this.promo = params['id'];
            this.ref = params['refId'];
          });


    }



    close(){
        this.dialogRef.close(true);
    }

    files: File[] = [];

    onSelect(event:any) {
        this.files.push(...event.addedFiles);
    }

    onRemove(event:any) {
        this.files.splice(this.files.indexOf(event), 1);
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }
    saveApprenantExcel() {
        if (this.files) {
          const formData: FormData = new FormData();
          formData.append('excel_file', this.files[0], this.files[0].name);
          formData.append('promo_id', this.promo_id.toString());
          formData.append('referentiel_id', this.ref_id.toString());
          console.log(formData);
          console.log(this.files);

          this.apprenantServices.postApprenantExcel(formData).subscribe({
              next: (response: any) => {
                this.timer('Chargement du fichier en cours');
            //   this.successAlert(response.message)
            this.router.navigateByUrl('/',{
                skipLocationChange : true
              }).then(() => {
                this.router.navigate([`/pages/promos/detail/${this.promo_id}/${this.ref_id}`]);
              })
            },
            error: (error: any) => {
            // this.timer('Chargement du fichier en cours');
            this.wrongAlert(error.error.message)

            }
          });
        }
        }

              /**
 * position sweet alert
 * @param position modal content
 */
    successAlert(description:string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: description,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  wrongAlert(description:string) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: description,
      })
  }



   /**
   * timer sweet alert
   * @param timer modal content
   */
   timer(title : string, html :string = 'Temps restant <b></b> milliseconds.',time : number = 2000) {
    let timerInterval: any;
    Swal.fire({
      title: title,
      html: html,
      timer: time,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer();
          if (content) {
            const b: any = content.querySelector('b');
            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    });
  }



}
